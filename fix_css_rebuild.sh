#!/bin/bash
# Fix globals.css (no @tailwind directives) + remove conflicting postcss.config + rebuild
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

encode() {
  if [[ "$(uname)" == "Darwin" ]]; then base64 -i "$1"; else base64 -w0 "$1"; fi
}

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
      exit 1
    fi
    echo -n "."
  done
  echo -e "${RED}Timeout${NC}"; exit 1
}

echo "============================================"
echo "  3deMayo: Fix CSS + Rebuild"
echo "============================================"

# Step 1: Deploy fixed globals.css (no @tailwind directives)
echo -e "\n${YELLOW}[1/3] Deploy fixed globals.css${NC}"
[[ ! -f "$DIR/globals.css" ]] && { echo -e "${RED}Missing globals.css${NC}"; exit 1; }
B64=$(encode "$DIR/globals.css")
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters "{\"commands\":[\"echo '$B64' | base64 -d > /opt/3demayo/web/app/globals.css && wc -c /opt/3demayo/web/app/globals.css\"]}" \
  --comment "Deploy globals.css" --query "Command.CommandId" --output text 2>&1)
echo -n "  Uploading..."
wait_for "$CMD_ID" 60
echo -e " ${GREEN}✓${NC}"

# Step 2: Remove conflicting postcss.config.js + tailwind.config.ts
echo -e "\n${YELLOW}[2/3] Remove conflicting PostCSS/Tailwind configs${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["rm -f /opt/3demayo/web/postcss.config.js /opt/3demayo/web/postcss.config.cjs /opt/3demayo/web/tailwind.config.ts /opt/3demayo/web/tailwind.config.js && echo REMOVED && ls /opt/3demayo/web/postcss* /opt/3demayo/web/tailwind* 2>/dev/null || echo CLEAN"]}' \
  --comment "Remove PostCSS configs" --query "Command.CommandId" --output text 2>&1)
echo -n "  Removing..."
wait_for "$CMD_ID" 30
echo -e " ${GREEN}✓${NC}"

# Step 3: Clean build + PM2 restart
echo -e "\n${YELLOW}[3/3] Clean build + PM2 restart (3-4 min)${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["cd /opt/3demayo/web && rm -rf .next && npm run build 2>&1 | tail -20 && pm2 restart /opt/3demayo/ecosystem.config.json && echo BUILD_OK"]}' \
  --timeout-seconds 420 \
  --comment "3deMayo clean build" \
  --query "Command.CommandId" --output text 2>&1)
echo -n "  Building..."
wait_for "$CMD_ID" 420
echo -e " ${GREEN}✓ BUILT${NC}"

echo ""
echo -e "${GREEN}============================================"
echo "  DONE — check http://54.241.20.166:3003/"
echo -e "============================================${NC}"
