#!/bin/bash
# Deploy ES|EN bilingual toggle + /en route to EC2
# Run from Mac in the same folder as all the .tsx files
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

encode() { base64 -i "$1"; }

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

deploy_file() {
  local LOCAL="$1" REMOTE="$2" LABEL="$3"
  [[ ! -f "$LOCAL" ]] && { echo -e "${RED}Missing: $LOCAL${NC}"; exit 1; }
  local B64
  B64=$(encode "$LOCAL")
  local CMD_ID
  CMD_ID=$(aws ssm send-command \
    --region "$REGION" --instance-ids "$TARGET" \
    --document-name "AWS-RunShellScript" \
    --parameters "{\"commands\":[\"mkdir -p $(dirname "$REMOTE") && echo '$B64' | base64 -d > $REMOTE && echo OK\"]}" \
    --comment "$LABEL" --query "Command.CommandId" --output text 2>&1)
  echo -n "  $LABEL..."
  wait_for "$CMD_ID" 90
  echo -e " ${GREEN}✓${NC}"
}

echo "============================================"
echo "  3deMayo: ES|EN Bilingual Deploy"
echo "============================================"

# Step 1: Create components directory
echo -e "\n${YELLOW}[1/7] Create components dir${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["mkdir -p /opt/3demayo/web/app/components && echo ok"]}' \
  --query "Command.CommandId" --output text 2>&1)
wait_for "$CMD_ID" 30

# Step 2: Deploy LangContext
echo -e "\n${YELLOW}[2/7] LangContext (language state)${NC}"
deploy_file "$DIR/lang_context.tsx" "/opt/3demayo/web/app/components/LangContext.tsx" "LangContext"

# Step 3: Deploy SiteNav (with built-in ES|EN toggle)
echo -e "\n${YELLOW}[3/7] SiteNav (with toggle)${NC}"
deploy_file "$DIR/site_nav.tsx" "/opt/3demayo/web/app/components/SiteNav.tsx" "SiteNav"

# Step 4: Deploy updated root layout (wraps with LangProvider + SiteNav)
echo -e "\n${YELLOW}[4/7] Root layout (hreflang + LangProvider)${NC}"
deploy_file "$DIR/layout_bilingual.tsx" "/opt/3demayo/web/app/layout.tsx" "layout.tsx"

# Step 5: Deploy ES homepage (already has hero image)
echo -e "\n${YELLOW}[5/7] ES homepage (page.tsx — already deployed, re-add nav padding)${NC}"
deploy_file "$DIR/page_hero.tsx" "/opt/3demayo/web/app/page.tsx" "page.tsx ES"

# Step 6: Create /en route with EN homepage
echo -e "\n${YELLOW}[6/7] EN homepage (/app/en/page.tsx)${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["mkdir -p /opt/3demayo/web/app/en && echo ok"]}' \
  --query "Command.CommandId" --output text 2>&1)
wait_for "$CMD_ID" 30
deploy_file "$DIR/en_page.tsx" "/opt/3demayo/web/app/en/page.tsx" "page.tsx EN"

# Step 7: Rebuild
echo -e "\n${YELLOW}[7/7] Build + restart (3-4 min)${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["cd /opt/3demayo/web && rm -rf .next && npm run build 2>&1 | tail -25 && pm2 restart /opt/3demayo/ecosystem.config.json && echo BUILD_RESTART_OK"]}' \
  --timeout-seconds 480 \
  --comment "Bilingual rebuild" \
  --query "Command.CommandId" --output text 2>&1)
echo -n "  Building..."
wait_for "$CMD_ID" 480
echo -e " ${GREEN}✓ DONE${NC}"

echo ""
echo -e "${GREEN}============================================"
echo "  ES → http://54.241.20.166:3003/"
echo "  EN → http://54.241.20.166:3003/en"
echo "  Toggle in nav top-right on both"
echo -e "============================================${NC}"
