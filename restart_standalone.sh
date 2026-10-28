#!/bin/bash
# Restart PM2 with standalone server (config already written)
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"

RED='\033[0;31m'; GREEN='\033[0;32m'; NC='\033[0m'

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
echo "  Step 1: Delete old PM2 process + start fresh"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "pm2 delete 3demayo-web 2>/dev/null || echo was_not_running",
    "pm2 start /opt/3demayo/ecosystem.config.json",
    "sleep 5",
    "pm2 list"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Starting standalone server..."
wait_for "$CMD_ID" 60
echo ""

echo "============================================"
echo "  Step 2: Check logs"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "pm2 logs 3demayo-web --lines 20 --nostream 2>&1 | tail -25"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Reading logs..."
wait_for "$CMD_ID" 60
echo ""

echo "============================================"
echo "  Step 3: Curl homepage"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "curl -s -o /dev/null -w \"/ = %{http_code}\" http://localhost:3003/"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Curling /..."
wait_for "$CMD_ID" 30
echo ""

echo "============================================"
echo "  Step 4: Curl /maestras"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "curl -s -o /dev/null -w \"/maestras = %{http_code}\" http://localhost:3003/maestras"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Curling /maestras..."
wait_for "$CMD_ID" 30
echo ""

echo "============================================"
echo "  Step 5: Curl /palenques"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "curl -s -o /dev/null -w \"/palenques = %{http_code}\" http://localhost:3003/palenques"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Curling /palenques..."
wait_for "$CMD_ID" 30
echo ""

echo "============================================"
echo "  Step 6: Curl /en"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "curl -s -o /dev/null -w \"/en = %{http_code}\" http://localhost:3003/en"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Curling /en..."
wait_for "$CMD_ID" 30
echo ""

echo -e "\n${GREEN}Check browser: http://54.241.20.166:3003/maestras${NC}"
