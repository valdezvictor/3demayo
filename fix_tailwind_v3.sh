#!/bin/bash
# Downgrade Tailwind v4 → v3 + restore correct postcss config + rebuild
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
echo "  3deMayo: Tailwind v4→v3 fix + Rebuild"
echo "============================================"

# Step 1: Deploy globals.css WITH @tailwind directives (v3 style)
echo -e "\n${YELLOW}[1/4] Deploy globals.css (v3 directives)${NC}"
[[ ! -f "$DIR/globals.css" ]] && { echo -e "${RED}Missing globals.css${NC}"; exit 1; }
B64=$(encode "$DIR/globals.css")
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters "{\"commands\":[\"echo '$B64' | base64 -d > /opt/3demayo/web/app/globals.css && echo OK\"]}" \
  --comment "Deploy globals.css v3" --query "Command.CommandId" --output text 2>&1)
echo -n "  Deploying..."
wait_for "$CMD_ID" 60
echo -e " ${GREEN}✓${NC}"

# Step 2: Deploy tailwind.config.js (v3 format, .js not .ts)
echo -e "\n${YELLOW}[2/4] Deploy tailwind.config.js (v3)${NC}"
[[ ! -f "$DIR/tailwind.config.js" ]] && { echo -e "${RED}Missing tailwind.config.js${NC}"; exit 1; }
B64=$(encode "$DIR/tailwind.config.js")
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters "{\"commands\":[\"echo '$B64' | base64 -d > /opt/3demayo/web/tailwind.config.js && echo OK\"]}" \
  --comment "Deploy tailwind config" --query "Command.CommandId" --output text 2>&1)
echo -n "  Deploying..."
wait_for "$CMD_ID" 60
echo -e " ${GREEN}✓${NC}"

# Step 3: Deploy postcss.config.js
echo -e "\n${YELLOW}[3/4] Deploy postcss.config.js${NC}"
[[ ! -f "$DIR/postcss.config.js" ]] && { echo -e "${RED}Missing postcss.config.js${NC}"; exit 1; }
B64=$(encode "$DIR/postcss.config.js")
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters "{\"commands\":[\"echo '$B64' | base64 -d > /opt/3demayo/web/postcss.config.js && echo OK\"]}" \
  --comment "Deploy postcss config" --query "Command.CommandId" --output text 2>&1)
echo -n "  Deploying..."
wait_for "$CMD_ID" 60
echo -e " ${GREEN}✓${NC}"

# Step 4: npm install tailwind v3 + clean build + PM2
echo -e "\n${YELLOW}[4/4] Install Tailwind v3 + clean build (4-5 min)${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["cd /opt/3demayo/web && npm install tailwindcss@3 autoprefixer@10 postcss@8 --save-dev --legacy-peer-deps 2>&1 | tail -5 && rm -rf .next && npm run build 2>&1 | tail -20 && pm2 restart /opt/3demayo/ecosystem.config.json && echo BUILD_OK"]}' \
  --timeout-seconds 480 \
  --comment "Install Tailwind v3 + rebuild" \
  --query "Command.CommandId" --output text 2>&1)
echo -n "  Installing + building..."
wait_for "$CMD_ID" 480
echo -e " ${GREEN}✓ DONE${NC}"

echo ""
echo -e "${GREEN}============================================"
echo "  Styles should be live: http://54.241.20.166:3003/"
echo -e "============================================${NC}"
