#!/bin/bash
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"

CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "echo === PM2 status ===",
    "pm2 list",
    "echo",
    "echo === curl all routes ===",
    "for route in / /en /maestras /palenques /documental /about /for-restaurants; do echo -n \"$route: \"; curl -s -o /dev/null -w \"%{http_code}\" http://localhost:3003$route; echo; done",
    "echo",
    "echo === next.config ===",
    "cat /opt/3demayo/web/next.config.js",
    "echo",
    "echo === .next dir contents ===",
    "ls /opt/3demayo/web/.next/",
    "echo",
    "echo === server/app routes compiled ===",
    "ls /opt/3demayo/web/.next/server/app/",
    "echo",
    "echo === PM2 logs last 30 lines ===",
    "pm2 logs 3demayo-web --lines 30 --nostream 2>&1 | tail -40"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)

echo "Waiting for diagnostic..."
for i in {1..40}; do
  sleep 4
  S=$(aws ssm get-command-invocation --region $REGION --command-id "$CMD_ID" --instance-id "$TARGET" --query "Status" --output text 2>/dev/null)
  if [[ "$S" == "Success" ]]; then
    aws ssm get-command-invocation --region $REGION --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardOutputContent" --output text
    break
  elif [[ "$S" == "Failed" ]]; then
    aws ssm get-command-invocation --region $REGION --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardErrorContent" --output text
    break
  fi
  echo -n "."
done
