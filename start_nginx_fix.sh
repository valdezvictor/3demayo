#!/bin/bash
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"

RED='\033[0;31m'; GREEN='\033[0;32m'; NC='\033[0m'

wait_for() {
  local CMD_ID="$1" timeout="${2:-60}"
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
echo "  Step 1: Test nginx config + start nginx"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "nginx -t 2>&1",
    "systemctl start nginx",
    "sleep 2",
    "systemctl is-active nginx",
    "systemctl enable nginx"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Starting nginx..."
wait_for "$CMD_ID" 30
echo ""

echo "============================================"
echo "  Step 2: Curl via domain (simulated)"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "curl -s -o /dev/null -w \"/ via port 80 = %{http_code}\" -H \"Host: 3demayo.com\" http://localhost:80/",
    "echo",
    "curl -s -o /dev/null -w \"/maestras via port 80 = %{http_code}\" -H \"Host: 3demayo.com\" http://localhost:80/maestras",
    "echo",
    "curl -s -o /dev/null -w \"/en via port 80 = %{http_code}\" -H \"Host: 3demayo.com\" http://localhost:80/en",
    "echo"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Curling via nginx..."
wait_for "$CMD_ID" 30
echo ""

echo "============================================"
echo "  Step 3: Check 3demayo nginx config"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "cat /etc/nginx/sites-enabled/3demayo"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Reading nginx config..."
wait_for "$CMD_ID" 30
echo ""

echo -e "${GREEN}Now test in browser: https://3demayo.com/maestras${NC}"
echo -e "${YELLOW}(If DNS isn't pointing there yet, you'll need to either:${NC}"
echo -e "${YELLOW}  a) Update DNS to point 3demayo.com → 54.241.20.166${NC}"
echo -e "${YELLOW}  b) Or add to /etc/hosts on your Mac:${NC}"
echo -e "${YELLOW}     54.241.20.166  3demayo.com www.3demayo.com )${NC}"
