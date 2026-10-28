#!/bin/bash
# ================================================================
# 3deMayo Deploy - Fixed for macOS
# Run from the 3demayo_deploy/ directory:
#   chmod +x deploy_fixed.sh && ./deploy_fixed.sh
# ================================================================

TARGET="i-0bea4767802cff93b"
REGION="us-west-1"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

# macOS-compatible base64 encode (no -w0 flag)
encode_file() {
  local file="$1"
  if [[ "$(uname)" == "Darwin" ]]; then
    base64 -i "$file"
  else
    base64 -w0 "$file"
  fi
}

wait_for_cmd() {
  local cmd_id="$1"
  echo -n "  Waiting"
  for i in {1..40}; do
    sleep 3
    STATUS=$(aws ssm get-command-invocation \
      --region "$REGION" --command-id "$cmd_id" \
      --instance-id "$TARGET" --query "Status" --output text 2>/dev/null)
    if [[ "$STATUS" == "Success" ]]; then
      OUTPUT=$(aws ssm get-command-invocation \
        --region "$REGION" --command-id "$cmd_id" \
        --instance-id "$TARGET" --query "StandardOutputContent" --output text 2>/dev/null)
      echo -e " ${GREEN}✓${NC}"
      [[ -n "$OUTPUT" ]] && echo "  → $OUTPUT"
      return 0
    elif [[ "$STATUS" == "Failed" || "$STATUS" == "TimedOut" ]]; then
      ERR=$(aws ssm get-command-invocation \
        --region "$REGION" --command-id "$cmd_id" \
        --instance-id "$TARGET" --query "StandardErrorContent" --output text 2>/dev/null)
      echo -e " ${RED}✗ $STATUS${NC}"
      echo "  $ERR"
      exit 1
    fi
    echo -n "."
  done
  echo -e " ${RED}Timeout${NC}"; exit 1
}

send_file() {
  local step="$1" desc="$2" src="$3" dest="$4"
  echo -e "\n${YELLOW}[$step] $desc${NC}"
  [[ ! -f "$DIR/$src" ]] && { echo -e "${RED}Missing: $DIR/$src${NC}"; exit 1; }
  B64=$(encode_file "$DIR/$src")
  # Use printf to avoid shell escaping issues with the b64 content
  CMD_ID=$(aws ssm send-command \
    --region "$REGION" \
    --instance-ids "$TARGET" \
    --document-name "AWS-RunShellScript" \
    --parameters "{\"commands\":[\"echo '$B64' | base64 -d > $dest && wc -c $dest\"]}" \
    --comment "$desc" \
    --query "Command.CommandId" --output text 2>&1)
  echo "  ID: $CMD_ID"
  wait_for_cmd "$CMD_ID"
}

echo "================================================================"
echo "  3deMayo Deploy (macOS fixed)"
echo "================================================================"

# Step 1: Verify files are present
echo -e "\n${YELLOW}[0/11] Pre-flight check${NC}"
for f in nav_component.tsx root_layout.tsx api_palenques_slug_route.ts homepage.tsx \
          palenques_page_enhanced.tsx palenques_slug_page.tsx maestras_page.tsx \
          about_page.tsx documental_page.tsx for_restaurants_page.tsx; do
  [[ -f "$DIR/$f" ]] && echo "  ✓ $f" || { echo -e "  ${RED}✗ MISSING: $f${NC}"; exit 1; }
done

# Step 2: Write all files
send_file "1/11" "Nav component" \
  "nav_component.tsx" "/opt/3demayo/web/app/components/Nav.tsx"

send_file "2/11" "Root layout" \
  "root_layout.tsx" "/opt/3demayo/web/app/layout.tsx"

send_file "3/11" "API route [slug]" \
  "api_palenques_slug_route.ts" "/opt/3demayo/web/app/api/palenques/[slug]/route.ts"

send_file "4/11" "Homepage" \
  "homepage.tsx" "/opt/3demayo/web/app/page.tsx"

send_file "5/11" "Palenques listing" \
  "palenques_page_enhanced.tsx" "/opt/3demayo/web/app/palenques/page.tsx"

send_file "6/11" "Palenque detail [slug]" \
  "palenques_slug_page.tsx" "/opt/3demayo/web/app/palenques/[slug]/page.tsx"

send_file "7/11" "Maestras page" \
  "maestras_page.tsx" "/opt/3demayo/web/app/maestras/page.tsx"

send_file "8/11" "About page" \
  "about_page.tsx" "/opt/3demayo/web/app/about/page.tsx"

send_file "9/11" "Documental page" \
  "documental_page.tsx" "/opt/3demayo/web/app/documental/page.tsx"

send_file "10/11" "For-restaurants page" \
  "for_restaurants_page.tsx" "/opt/3demayo/web/app/for-restaurants/page.tsx"

# Step 11: Build + restart (fixed PM2 path)
echo -e "\n${YELLOW}[11/11] npm build + pm2 restart (2-3 min)${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" \
  --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["cd /opt/3demayo/web && sudo rm -rf .next && npm run build 2>&1 | tail -20 && pm2 restart /opt/3demayo/ecosystem.config.json && echo BUILD_RESTART_OK"]}' \
  --timeout-seconds 300 \
  --comment "3deMayo build + restart" \
  --query "Command.CommandId" --output text)
echo "  ID: $CMD_ID"
echo -n "  Building"
for i in {1..60}; do
  sleep 5
  STATUS=$(aws ssm get-command-invocation \
    --region "$REGION" --command-id "$CMD_ID" \
    --instance-id "$TARGET" --query "Status" --output text 2>/dev/null)
  if [[ "$STATUS" == "Success" ]]; then
    OUTPUT=$(aws ssm get-command-invocation \
      --region "$REGION" --command-id "$CMD_ID" \
      --instance-id "$TARGET" --query "StandardOutputContent" --output text 2>/dev/null)
    echo -e " ${GREEN}✓ BUILT${NC}"
    echo "$OUTPUT"
    break
  elif [[ "$STATUS" == "Failed" || "$STATUS" == "TimedOut" ]]; then
    ERR=$(aws ssm get-command-invocation \
      --region "$REGION" --command-id "$CMD_ID" \
      --instance-id "$TARGET" --query "StandardErrorContent" --output text 2>/dev/null)
    echo -e " ${RED}✗ FAILED${NC}"; echo "$ERR"; exit 1
  fi
  echo -n "."
done

echo ""
echo -e "${GREEN}================================================================"
echo "  DONE — verify: curl http://54.241.20.166:3003/api/palenques"
echo -e "================================================================${NC}"
