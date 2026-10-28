#!/bin/bash
# Run this from your Mac in the same folder as agave_grave_hero.jpeg
# Usage: bash deploy_hero_mac.sh ./agave_grave_hero.jpeg
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"
HERO_IMG="${1:-./agave_grave_hero.jpeg}"

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
echo "  3deMayo: Hero Image + Page Deploy"
echo "============================================"

# Verify image exists
[[ ! -f "$HERO_IMG" ]] && { echo -e "${RED}Image not found: $HERO_IMG${NC}"; echo "Usage: bash $0 /path/to/agave_grave_hero.jpeg"; exit 1; }
echo "  Image: $HERO_IMG ($(du -h "$HERO_IMG" | cut -f1))"

# ── Step 1: Upload image via base64 in 8KB chunks ──
echo -e "\n${YELLOW}[1/4] Uploading hero image...${NC}"

# Encode to temp b64 file
TMP_B64=$(mktemp /tmp/hero_XXXXXX.b64)
base64 -i "$HERO_IMG" > "$TMP_B64"
TOTAL=$(wc -c < "$TMP_B64" | tr -d ' ')
echo "  Base64 size: $TOTAL chars → uploading in chunks"

# Clear remote temp
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["rm -f /tmp/hero_upload.b64 && mkdir -p /opt/3demayo/web/public/images && echo cleared"]}' \
  --query "Command.CommandId" --output text 2>&1)
wait_for "$CMD_ID" 30 > /dev/null

# Upload 8000-char chunks
CHUNK=0
while IFS= read -r -n 8000 PART; do
  CHUNK=$((CHUNK + 1))
  # Escape single quotes in base64 (there are none, but be safe)
  SAFE="${PART//\'/\'\\\'\'}"
  CMD_ID=$(aws ssm send-command \
    --region "$REGION" --instance-ids "$TARGET" \
    --document-name "AWS-RunShellScript" \
    --parameters "{\"commands\":[\"printf '%s' '$SAFE' >> /tmp/hero_upload.b64\"]}" \
    --query "Command.CommandId" --output text 2>&1)
  wait_for "$CMD_ID" 60 > /dev/null
  [[ $((CHUNK % 20)) == 0 ]] && echo "  chunk $CHUNK done..."
done < "$TMP_B64"
rm -f "$TMP_B64"

echo ""
echo -n "  Decoding on server..."
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["base64 -d /tmp/hero_upload.b64 > /opt/3demayo/web/public/images/agave_grave_hero.jpeg && ls -lh /opt/3demayo/web/public/images/agave_grave_hero.jpeg && echo IMAGE_OK"]}' \
  --query "Command.CommandId" --output text 2>&1)
wait_for "$CMD_ID" 60
echo -e " ${GREEN}✓ Image on server${NC}"

# ── Step 2: Deploy page.tsx ──
echo -e "\n${YELLOW}[2/4] Deploy homepage (page.tsx)...${NC}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PAGE_FILE="$SCRIPT_DIR/page_hero.tsx"
[[ ! -f "$PAGE_FILE" ]] && { echo -e "${RED}Missing page_hero.tsx next to this script${NC}"; exit 1; }

B64=$(base64 -i "$PAGE_FILE")
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters "{\"commands\":[\"echo '$B64' | base64 -d > /opt/3demayo/web/app/page.tsx && echo OK\"]}" \
  --query "Command.CommandId" --output text 2>&1)
echo -n "  Deploying..."
wait_for "$CMD_ID" 60
echo -e " ${GREEN}✓${NC}"

# ── Step 3: Verify next.config allows local images ──
echo -e "\n${YELLOW}[3/4] Check next.config for image optimization...${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["cat /opt/3demayo/web/next.config.js 2>/dev/null || cat /opt/3demayo/web/next.config.mjs 2>/dev/null || echo NO_NEXT_CONFIG"]}' \
  --query "Command.CommandId" --output text 2>&1)
NEXT_CFG=$(wait_for "$CMD_ID" 30)
echo "  $NEXT_CFG"

# ── Step 4: Rebuild ──
echo -e "\n${YELLOW}[4/4] Build + restart (3-4 min)...${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["cd /opt/3demayo/web && rm -rf .next && npm run build 2>&1 | tail -20 && pm2 restart /opt/3demayo/ecosystem.config.json && echo BUILD_RESTART_OK"]}' \
  --timeout-seconds 480 \
  --comment "Hero deploy rebuild" \
  --query "Command.CommandId" --output text 2>&1)
echo -n "  Building..."
wait_for "$CMD_ID" 480
echo -e " ${GREEN}✓ DONE${NC}"

echo ""
echo -e "${GREEN}============================================"
echo "  Hero live → http://54.241.20.166:3003/"
echo -e "============================================${NC}"
