#!/bin/bash
# EC2 deploy via GitHub pull — run this from your Mac after pushing to main
# Usage: bash deploy_from_git.sh
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

wait_for() {
  local CMD_ID="$1" timeout="${2:-480}"
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
echo "  3deMayo: Deploy from GitHub → EC2"
echo "============================================"

CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "cd /opt/3demayo/web",
    "echo === git pull ===",
    "git pull origin main 2>&1",
    "echo === npm install (if package.json changed) ===",
    "npm install --legacy-peer-deps 2>&1 | tail -3",
    "echo === build ===",
    "rm -rf .next && npm run build 2>&1 | tail -25",
    "echo === copy static into standalone ===",
    "cp -r .next/static .next/standalone/.next/static 2>/dev/null && echo static_ok || echo static_skip",
    "cp -r public .next/standalone/public 2>/dev/null && echo public_ok || echo public_skip",
    "echo === restart ===",
    "pm2 restart /opt/3demayo/ecosystem.config.json",
    "echo DEPLOY_OK"
  ]}' \
  --timeout-seconds 600 \
  --comment "Git deploy 3demayo" \
  --query "Command.CommandId" --output text 2>&1)

echo -n "Pulling + building (4-5 min)..."
wait_for "$CMD_ID" 600
echo -e "\n${GREEN}Done → http://54.241.20.166:3003/${NC}"
