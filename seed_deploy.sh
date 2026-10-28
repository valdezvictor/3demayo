#!/bin/bash
# ================================================================
# 3deMayo DB Seed — All 12 Mezcal States + 40 Agave Varieties
# Run from your local machine in the 3demayo_deploy/ directory
# ================================================================
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

echo "================================================================"
echo "  3deMayo DB Seed: All 12 regions + 40 agave varieties"
echo "================================================================"

# Encode the SQL file (macOS-safe)
SQL_FILE="$DIR/seed_all_regions.sql"
if [[ ! -f "$SQL_FILE" ]]; then
  echo -e "${RED}ERROR: seed_all_regions.sql not found in $DIR${NC}"
  exit 1
fi

if [[ "$(uname)" == "Darwin" ]]; then
  B64=$(base64 -i "$SQL_FILE")
else
  B64=$(base64 -w0 "$SQL_FILE")
fi

echo -e "${YELLOW}[1/2] Uploading SQL seed file to EC2...${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" \
  --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters "{\"commands\":[\"echo '$B64' | base64 -d > /tmp/seed_3demayo.sql && echo UPLOAD_OK\"]}" \
  --comment "Upload 3deMayo seed SQL" \
  --query "Command.CommandId" \
  --output text 2>&1)

if [[ $? -ne 0 ]]; then echo -e "${RED}Failed: $CMD_ID${NC}"; exit 1; fi
echo "  ID: $CMD_ID"
echo -n "  Uploading..."
for i in {1..20}; do
  sleep 3
  STATUS=$(aws ssm get-command-invocation --region "$REGION" --command-id "$CMD_ID" --instance-id "$TARGET" --query "Status" --output text 2>/dev/null)
  if [[ "$STATUS" == "Success" ]]; then echo -e " ${GREEN}✓ Uploaded${NC}"; break; fi
  if [[ "$STATUS" == "Failed" ]]; then
    echo -e " ${RED}✗ Failed${NC}"
    aws ssm get-command-invocation --region "$REGION" --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardErrorContent" --output text
    exit 1
  fi
  echo -n "."
done

echo -e "${YELLOW}[2/2] Running psql seed against cafevivo_prod...${NC}"
PSQL_CMD="PGPASSWORD='cv2026Vivo' psql -h cv-prod-db.cyfiieky5gzb.us-west-1.rds.amazonaws.com -U cvadmin -d cafevivo_prod -p 5432 --set sslmode=require -f /tmp/seed_3demayo.sql 2>&1 | tail -20"

CMD_ID=$(aws ssm send-command \
  --region "$REGION" \
  --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters "{\"commands\":[\"$PSQL_CMD\"]}" \
  --timeout-seconds 120 \
  --comment "3deMayo psql seed" \
  --query "Command.CommandId" \
  --output text 2>&1)

echo "  ID: $CMD_ID"
echo -n "  Seeding..."
for i in {1..30}; do
  sleep 4
  STATUS=$(aws ssm get-command-invocation --region "$REGION" --command-id "$CMD_ID" --instance-id "$TARGET" --query "Status" --output text 2>/dev/null)
  if [[ "$STATUS" == "Success" ]]; then
    OUTPUT=$(aws ssm get-command-invocation --region "$REGION" --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardOutputContent" --output text 2>/dev/null)
    echo -e " ${GREEN}✓ SEEDED${NC}"
    echo "$OUTPUT"
    break
  fi
  if [[ "$STATUS" == "Failed" || "$STATUS" == "TimedOut" ]]; then
    ERR=$(aws ssm get-command-invocation --region "$REGION" --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardErrorContent" --output text 2>/dev/null)
    echo -e " ${RED}✗ $STATUS${NC}"
    echo "$ERR"
    exit 1
  fi
  echo -n "."
done

echo ""
echo -e "${GREEN}================================================================"
echo "  SEED COMPLETE"
echo "  Expected: 12 regions + 40 agave varieties"
echo -e "================================================================${NC}"
