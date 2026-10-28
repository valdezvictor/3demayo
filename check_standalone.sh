#!/bin/bash
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"

CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "echo === ecosystem config ===",
    "cat /opt/3demayo/ecosystem.config.json",
    "echo",
    "echo === standalone server.js exists? ===",
    "ls -lh /opt/3demayo/web/.next/standalone/ 2>/dev/null || echo NO_STANDALONE_DIR",
    "echo",
    "echo === .next/server/app routes ===",
    "ls /opt/3demayo/web/.next/server/app/ 2>/dev/null | head -20",
    "echo",
    "echo === PM2 script ===",
    "pm2 show 3demayo-web 2>/dev/null | grep -E script",
    "echo",
    "echo === curl test ===",
    "curl -s -o /dev/null -w \"%{http_code} %{url_effective}\" http://localhost:3003/maestras"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)

echo "Waiting for SSM..."
for i in {1..40}; do
  sleep 4
  S=$(aws ssm get-command-invocation --region $REGION --command-id "$CMD_ID" --instance-id "$TARGET" --query "Status" --output text 2>/dev/null)
  if [[ "$S" == "Success" ]]; then
    aws ssm get-command-invocation --region $REGION --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardOutputContent" --output text
    break
  elif [[ "$S" == "Failed" ]]; then
    aws ssm get-command-invocation --region $REGION --command-id "$TARGET" --query "StandardErrorContent" --output text
    break
  fi
  echo -n "."
done
