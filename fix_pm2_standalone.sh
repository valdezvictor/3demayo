#!/bin/bash
# Fix PM2 to use standalone server instead of npm start
# Root cause: next.config has output:"standalone" but ecosystem runs "npm start" (next start)
# These are explicitly incompatible per Next.js docs
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

wait_for() {
  local CMD_ID="$1" timeout="${2:-120}"
  local max=$(( timeout / 3 + 5 ))
  for i in $(seq 1 $max); do
    sleep 3
    local S; S=$(aws ssm get-command-invocation --region "$REGION" \
      --command-id "$CMD_ID" --instance-id "$TARGET" --query "Status" --output text 2>/dev/null)
    if [[ "$S" == "Success" ]]; then
      aws ssm get-command-invocation --region "$REGION" \
        --command-id "$CMD_ID" --instance-id "$TARGET" \
        --query "StandardOutputContent" --output text 2>/dev/null
      return 0
    elif [[ "$S" == "Failed" || "$S" == "TimedOut" ]]; then
      echo -e "${RED}✗ $S${NC}"
      aws ssm get-command-invocation --region "$REGION" \
        --command-id "$CMD_ID" --instance-id "$TARGET" \
        --query "StandardErrorContent" --output text 2>/dev/null
      return 1
    fi
    echo -n "."
  done
  echo -e "${RED}Timeout${NC}"; return 1
}

echo "============================================"
echo "  Fix PM2: switch to standalone server"
echo "============================================"

# Write new ecosystem config using node + standalone server
NEW_ECOSYSTEM=$(cat <<'EOFEC'
{
  "apps": [{
    "name": "3demayo-web",
    "script": "node",
    "args": ".next/standalone/server.js",
    "cwd": "/opt/3demayo/web",
    "env": {
      "NODE_ENV": "production",
      "PORT": "3003",
      "HOSTNAME": "0.0.0.0",
      "DATABASE_URL": "postgresql://cvadmin:cv2026Vivo@cv-prod-db.cyfiieky5gzb.us-west-1.rds.amazonaws.com/cafevivo_prod?sslmode=require"
    }
  }]
}
EOFEC
)

# Base64 encode to pass safely through SSM JSON
ENCODED=$(echo "$NEW_ECOSYSTEM" | base64)

CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters "{\"commands\":[
    \"echo === Writing new ecosystem config ===\",
    \"echo '$ENCODED' | base64 -d > /opt/3demayo/ecosystem.config.json\",
    \"echo === Verifying config ===\",
    \"cat /opt/3demayo/ecosystem.config.json\",
    \"echo === Confirming standalone server.js exists ===\",
    \"ls -lh /opt/3demayo/web/.next/standalone/server.js 2>/dev/null || echo MISSING_server.js\",
    \"echo === Confirming static + public in standalone ===\",
    \"ls /opt/3demayo/web/.next/standalone/.next/static 2>/dev/null | head -3 || echo MISSING_static\",
    \"ls /opt/3demayo/web/.next/standalone/public 2>/dev/null | head -3 || echo MISSING_public\"
  ]}" \
  --query "Command.CommandId" --output text 2>&1)

echo -n "Writing config..."
wait_for "$CMD_ID" 60
echo ""

echo "============================================"
echo "  Restart PM2 with new config"
echo "============================================"

CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "echo === Stopping old PM2 process ===",
    "pm2 delete 3demayo-web 2>/dev/null || echo was_not_running",
    "echo === Starting with new standalone config ===",
    "pm2 start /opt/3demayo/ecosystem.config.json",
    "sleep 4",
    "echo === PM2 status ===",
    "pm2 list",
    "echo === PM2 logs (last 15 lines) ===",
    "pm2 logs 3demayo-web --lines 15 --nostream 2>&1 | tail -20",
    "echo === Curl all routes ===",
    "for route in / /en /maestras /palenques /documental /about /for-restaurants; do echo -n \"$route: \"; curl -s -o /dev/null -w \"%{http_code}\" http://localhost:3003$route; echo; done"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)

echo -n "Restarting PM2 (standalone mode)..."
wait_for "$CMD_ID" 90
echo ""

echo -e "${GREEN}Done. Check http://54.241.20.166:3003/maestras in your browser${NC}"
