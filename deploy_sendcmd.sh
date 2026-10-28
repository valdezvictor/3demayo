#!/bin/bash
# ================================================================
# 3deMayo Full Deploy via AWS SSM send-command
# Run this from YOUR LOCAL MACHINE (not the EC2 / cloud container)
#
#   chmod +x deploy_sendcmd.sh
#   ./deploy_sendcmd.sh
#
# Prerequisites:
#   - AWS CLI installed + configured with credentials
#   - SSM access to instance i-0bea4767802cff93b in us-west-1
#   - All 9 source files in the same directory as this script
#     (homepage.tsx, palenques_page_enhanced.tsx, etc.)
#
# Each step fires a send-command to the EC2 instance.
# Wait for "STEP N COMPLETE" before proceeding.
# ================================================================

TARGET="i-0bea4767802cff93b"
REGION="us-west-1"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Color helpers
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

run_cmd() {
  local step="$1"; local desc="$2"; local cmd="$3"
  echo -e "\n${YELLOW}[$step] $desc${NC}"
  CMD_ID=$(aws ssm send-command \
    --region "$REGION" \
    --instance-ids "$TARGET" \
    --document-name "AWS-RunShellScript" \
    --parameters "{\"commands\":[\"$cmd\"]}" \
    --comment "$desc" \
    --query "Command.CommandId" \
    --output text 2>&1)
  if [[ $? -ne 0 ]]; then
    echo -e "${RED}send-command failed: $CMD_ID${NC}"
    exit 1
  fi
  echo "  Command ID: $CMD_ID"
  echo -n "  Waiting..."
  for i in {1..30}; do
    sleep 3
    STATUS=$(aws ssm get-command-invocation \
      --region "$REGION" \
      --command-id "$CMD_ID" \
      --instance-id "$TARGET" \
      --query "Status" --output text 2>/dev/null)
    if [[ "$STATUS" == "Success" ]]; then
      OUTPUT=$(aws ssm get-command-invocation \
        --region "$REGION" \
        --command-id "$CMD_ID" \
        --instance-id "$TARGET" \
        --query "StandardOutputContent" --output text 2>/dev/null)
      echo -e " ${GREEN}✓ $STATUS${NC}"
      [[ -n "$OUTPUT" ]] && echo "  → $OUTPUT"
      return 0
    elif [[ "$STATUS" == "Failed" || "$STATUS" == "TimedOut" || "$STATUS" == "Cancelled" ]]; then
      ERR=$(aws ssm get-command-invocation \
        --region "$REGION" \
        --command-id "$CMD_ID" \
        --instance-id "$TARGET" \
        --query "StandardErrorContent" --output text 2>/dev/null)
      echo -e " ${RED}✗ $STATUS${NC}"
      echo "  Error: $ERR"
      exit 1
    fi
    echo -n "."
  done
  echo -e " ${RED}Timeout after 90s${NC}"
  exit 1
}

run_b64_file() {
  local step="$1"; local desc="$2"; local src="$3"; local dest="$4"
  echo -e "\n${YELLOW}[$step] $desc${NC}"
  if [[ ! -f "$DIR/$src" ]]; then
    echo -e "${RED}ERROR: $DIR/$src not found${NC}"
    exit 1
  fi
  # Encode the file
  B64=$(base64 -w0 "$DIR/$src")
  # Build the remote command: decode base64 → write file
  REMOTE_CMD="echo '$B64' | base64 -d > '$dest' && echo WRITE_OK"
  CMD_ID=$(aws ssm send-command \
    --region "$REGION" \
    --instance-ids "$TARGET" \
    --document-name "AWS-RunShellScript" \
    --parameters "{\"commands\":[\"echo '$B64' | base64 -d > $dest && echo WRITE_OK\"]}" \
    --comment "$desc" \
    --query "Command.CommandId" \
    --output text 2>&1)
  if [[ $? -ne 0 ]]; then
    echo -e "${RED}send-command failed: $CMD_ID${NC}"
    exit 1
  fi
  echo "  Command ID: $CMD_ID"
  echo -n "  Waiting..."
  for i in {1..30}; do
    sleep 3
    STATUS=$(aws ssm get-command-invocation \
      --region "$REGION" \
      --command-id "$CMD_ID" \
      --instance-id "$TARGET" \
      --query "Status" --output text 2>/dev/null)
    if [[ "$STATUS" == "Success" ]]; then
      echo -e " ${GREEN}✓ Written${NC}"
      return 0
    elif [[ "$STATUS" == "Failed" || "$STATUS" == "TimedOut" ]]; then
      ERR=$(aws ssm get-command-invocation \
        --region "$REGION" \
        --command-id "$CMD_ID" \
        --instance-id "$TARGET" \
        --query "StandardErrorContent" --output text 2>/dev/null)
      echo -e " ${RED}✗ $STATUS${NC}"
      echo "  Error: $ERR"
      exit 1
    fi
    echo -n "."
  done
  exit 1
}

echo "================================================================"
echo "  3deMayo Full Site Deploy"
echo "  Target: $TARGET  Region: $REGION"
echo "================================================================"

# ── STEP 1: Create all directories ──────────────────────────────
run_cmd "1/11" "Create app directories" \
  "mkdir -p /opt/3demayo/web/app/components /opt/3demayo/web/app/maestras /opt/3demayo/web/app/documental /opt/3demayo/web/app/about && mkdir -p '/opt/3demayo/web/app/palenques/[slug]' && mkdir -p '/opt/3demayo/web/app/api/palenques/[slug]' && mkdir -p /opt/3demayo/web/app/for-restaurants && echo DIRS_OK"

# ── STEP 2: Nav component ───────────────────────────────────────
run_b64_file "2/11" "Write Nav.tsx" \
  "nav_component.tsx" \
  "/opt/3demayo/web/app/components/Nav.tsx"

# ── STEP 3: Root layout ─────────────────────────────────────────
run_b64_file "3/11" "Write layout.tsx" \
  "root_layout.tsx" \
  "/opt/3demayo/web/app/layout.tsx"

# ── STEP 4: API route ───────────────────────────────────────────
run_b64_file "4/11" "Write /api/palenques/[slug]/route.ts" \
  "api_palenques_slug_route.ts" \
  "/opt/3demayo/web/app/api/palenques/[slug]/route.ts"

# ── STEP 5: Homepage ────────────────────────────────────────────
run_b64_file "5/11" "Write homepage (app/page.tsx)" \
  "homepage.tsx" \
  "/opt/3demayo/web/app/page.tsx"

# ── STEP 6: Palenques listing ───────────────────────────────────
run_b64_file "6/11" "Write palenques listing (app/palenques/page.tsx)" \
  "palenques_page_enhanced.tsx" \
  "/opt/3demayo/web/app/palenques/page.tsx"

# ── STEP 7: Palenque detail ─────────────────────────────────────
run_b64_file "7/11" "Write palenque detail (app/palenques/[slug]/page.tsx)" \
  "palenques_slug_page.tsx" \
  "/opt/3demayo/web/app/palenques/[slug]/page.tsx"

# ── STEP 8: Maestras page ───────────────────────────────────────
run_b64_file "8/11" "Write maestras page" \
  "maestras_page.tsx" \
  "/opt/3demayo/web/app/maestras/page.tsx"

# ── STEP 9: About page ──────────────────────────────────────────
run_b64_file "9/11" "Write about page" \
  "about_page.tsx" \
  "/opt/3demayo/web/app/about/page.tsx"

# ── STEP 10: Documental + For-Restaurants ───────────────────────
run_b64_file "10a/11" "Write documental page" \
  "documental_page.tsx" \
  "/opt/3demayo/web/app/documental/page.tsx"

run_b64_file "10b/11" "Write for-restaurants page" \
  "for_restaurants_page.tsx" \
  "/opt/3demayo/web/app/for-restaurants/page.tsx"

# ── STEP 11: Build & restart PM2 ────────────────────────────────
echo -e "\n${YELLOW}[11/11] npm build + pm2 restart (takes ~2-3 min)${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" \
  --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["cd /opt/3demayo/web && sudo rm -rf .next && npm run build 2>&1 | tail -20 && pm2 restart /opt/3demayo/web/ecosystem.config.json && echo BUILD_RESTART_OK"]}' \
  --timeout-seconds 300 \
  --comment "3deMayo build + pm2 restart" \
  --query "Command.CommandId" \
  --output text)
echo "  Command ID: $CMD_ID"
echo -n "  Building (up to 3 min)..."
for i in {1..60}; do
  sleep 5
  STATUS=$(aws ssm get-command-invocation \
    --region "$REGION" \
    --command-id "$CMD_ID" \
    --instance-id "$TARGET" \
    --query "Status" --output text 2>/dev/null)
  if [[ "$STATUS" == "Success" ]]; then
    OUTPUT=$(aws ssm get-command-invocation \
      --region "$REGION" \
      --command-id "$CMD_ID" \
      --instance-id "$TARGET" \
      --query "StandardOutputContent" --output text 2>/dev/null)
    echo -e " ${GREEN}✓ BUILD COMPLETE${NC}"
    echo "$OUTPUT"
    break
  elif [[ "$STATUS" == "Failed" || "$STATUS" == "TimedOut" ]]; then
    ERR=$(aws ssm get-command-invocation \
      --region "$REGION" \
      --command-id "$CMD_ID" \
      --instance-id "$TARGET" \
      --query "StandardErrorContent" --output text 2>/dev/null)
    echo -e " ${RED}✗ BUILD FAILED${NC}"
    echo "$ERR"
    exit 1
  fi
  echo -n "."
done

echo ""
echo -e "${GREEN}================================================================"
echo "  DEPLOY COMPLETE"
echo "  Verify: curl http://54.241.20.166:3003/api/palenques"
echo -e "================================================================${NC}"
