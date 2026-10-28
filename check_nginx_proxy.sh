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
echo "  What is the PM2 process actually running?"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "pm2 show 3demayo-web 2>/dev/null | grep -E \"script|interpreter|cwd|exec mode|pid\"",
    "echo ---",
    "cat /proc/$(pm2 pid 3demayo-web 2>/dev/null)/cmdline 2>/dev/null | tr \"\\0\" \" \"; echo"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Checking PM2 process..."
wait_for "$CMD_ID" 30
echo ""

echo "============================================"
echo "  nginx status + config"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "systemctl is-active nginx 2>/dev/null || echo nginx_not_running",
    "echo --- sites-enabled ---",
    "ls /etc/nginx/sites-enabled/ 2>/dev/null || echo none",
    "echo --- sites-enabled contents ---",
    "cat /etc/nginx/sites-enabled/* 2>/dev/null || echo NO_SITES_ENABLED",
    "echo --- conf.d ---",
    "cat /etc/nginx/conf.d/*.conf 2>/dev/null || echo NO_CONF_D",
    "echo --- nginx.conf proxy lines ---",
    "grep -n \"proxy_pass\\|location\\|server_name\\|listen\\|3003\\|root\\|try_files\" /etc/nginx/nginx.conf 2>/dev/null | head -50"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Checking nginx..."
wait_for "$CMD_ID" 30
echo ""

echo "============================================"
echo "  What is listening on port 80 vs 3003?"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "ss -tlnp 2>/dev/null | grep -E \"LISTEN|:80|:443|:3003|:3000\"",
    "echo ---",
    "curl -v http://localhost:80/maestras 2>&1 | grep -E \"< HTTP|Location|Server:|Host:\" | head -10"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Checking ports..."
wait_for "$CMD_ID" 30
echo ""
