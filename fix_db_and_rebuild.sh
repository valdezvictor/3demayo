#!/bin/bash
# ================================================================
# 3deMayo: Fix DB regions + Rebuild (styles already deployed)
# Run from 3demayo_deploy/ on your Mac
# ================================================================
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

wait_for() {
  local CMD_ID="$1" timeout="${2:-60}"
  local max=$(( timeout / 3 + 5 ))
  for i in $(seq 1 $max); do
    sleep 3
    local S; S=$(aws ssm get-command-invocation --region "$REGION" \
      --command-id "$CMD_ID" --instance-id "$TARGET" \
      --query "Status" --output text 2>/dev/null)
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
      exit 1
    fi
    echo -n "."
  done
  echo -e "${RED}Timeout${NC}"; exit 1
}

encode() {
  if [[ "$(uname)" == "Darwin" ]]; then base64 -i "$1"; else base64 -w0 "$1"; fi
}

echo "================================================================"
echo "  3deMayo: DB Fix + Rebuild"
echo "================================================================"

# ── Step 1: Upload fix_regions.sql ──────────────────────────────
echo -e "\n${YELLOW}[1/3] Upload regions SQL${NC}"
SQL="$DIR/fix_regions.sql"
[[ ! -f "$SQL" ]] && { echo -e "${RED}Missing fix_regions.sql${NC}"; exit 1; }
B64=$(encode "$SQL")
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters "{\"commands\":[\"echo '$B64' | base64 -d > /tmp/fix_regions.sql && wc -l /tmp/fix_regions.sql\"]}" \
  --comment "Upload regions SQL" \
  --query "Command.CommandId" --output text 2>&1)
echo -n "  Uploading..."
wait_for "$CMD_ID" 60
echo -e " ${GREEN}✓ Uploaded${NC}"

# ── Step 2: Run SQL against DB ───────────────────────────────────
echo -e "\n${YELLOW}[2/3] Run psql — add columns + seed 11 new regions${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["PGPASSWORD=cv2026Vivo psql -h cv-prod-db.cyfiieky5gzb.us-west-1.rds.amazonaws.com -U cvadmin -d cafevivo_prod -p 5432 -v sslmode=require -f /tmp/fix_regions.sql 2>&1"]}' \
  --timeout-seconds 90 \
  --comment "Seed 12 regions" \
  --query "Command.CommandId" --output text 2>&1)
echo -n "  Running..."
wait_for "$CMD_ID" 90
echo -e " ${GREEN}✓ Done${NC}"

# ── Step 3: npm install tailwind + rebuild + PM2 restart ─────────
echo -e "\n${YELLOW}[3/3] npm install tailwind + build + PM2 restart (3-4 min)${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["cd /opt/3demayo/web && npm install tailwindcss autoprefixer postcss --save-dev 2>&1 | tail -3 && rm -rf .next && npm run build 2>&1 | tail -20 && pm2 restart /opt/3demayo/ecosystem.config.json && echo DONE"]}' \
  --timeout-seconds 420 \
  --comment "3deMayo rebuild" \
  --query "Command.CommandId" --output text 2>&1)
echo -n "  Building..."
wait_for "$CMD_ID" 420
echo -e " ${GREEN}✓ REBUILT${NC}"

echo ""
echo -e "${GREEN}================================================================"
echo "  ALL DONE"
echo "  Visit: http://54.241.20.166:3003/"
echo "  DB check: curl http://54.241.20.166:3003/api/palenques"
echo -e "================================================================${NC}"
