#!/bin/bash
# Fix 404 on inner pages — add ClientShell wrapper, fix layout.tsx
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

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

deploy_file() {
  local LOCAL="$1" REMOTE="$2" LABEL="$3"
  [[ ! -f "$LOCAL" ]] && { echo -e "${RED}Missing: $LOCAL${NC}"; exit 1; }
  local B64; B64=$(base64 -i "$LOCAL")
  local CMD_ID; CMD_ID=$(aws ssm send-command \
    --region "$REGION" --instance-ids "$TARGET" \
    --document-name "AWS-RunShellScript" \
    --parameters "{\"commands\":[\"echo '$B64' | base64 -d > $REMOTE && echo OK\"]}" \
    --comment "$LABEL" --query "Command.CommandId" --output text 2>&1)
  echo -n "  $LABEL..."
  wait_for "$CMD_ID" 90
  echo -e " ${GREEN}✓${NC}"
}

echo "============================================"
echo "  3deMayo: Fix inner page 404s"
echo "============================================"

# 1: Deploy ClientShell (the missing piece)
echo -e "\n${YELLOW}[1/3] Deploy ClientShell${NC}"
deploy_file "$DIR/client_shell.tsx" "/opt/3demayo/web/app/components/ClientShell.tsx" "ClientShell.tsx"

# 2: Deploy fixed layout (imports ClientShell, not SiteNav/LangProvider directly)
echo -e "\n${YELLOW}[2/3] Deploy fixed layout.tsx${NC}"
deploy_file "$DIR/layout_fixed.tsx" "/opt/3demayo/web/app/layout.tsx" "layout.tsx"

# 3: Rebuild
echo -e "\n${YELLOW}[3/3] Build + restart${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["cd /opt/3demayo/web && rm -rf .next && npm run build 2>&1 | tail -25 && pm2 restart /opt/3demayo/ecosystem.config.json && echo BUILD_RESTART_OK"]}' \
  --timeout-seconds 480 \
  --comment "Fix layout rebuild" \
  --query "Command.CommandId" --output text 2>&1)
echo -n "  Building..."
wait_for "$CMD_ID" 480
echo -e " ${GREEN}✓ DONE${NC}"

echo ""
echo -e "${GREEN}============================================"
echo "  All routes should be back:"
echo "  / → ES home  |  /en → EN home"
echo "  /maestras /palenques /documental etc ✓"
echo -e "============================================${NC}"
