#!/bin/bash
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"

CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["echo \"=== next.config ===\"; cat /opt/3demayo/web/next.config.js 2>/dev/null || cat /opt/3demayo/web/next.config.mjs 2>/dev/null || cat /opt/3demayo/web/next.config.ts 2>/dev/null || echo MISSING; echo; echo \"=== package.json deps ===\"; cat /opt/3demayo/web/package.json; echo; echo \"=== ls web root ===\"; ls /opt/3demayo/web/"]}' \
  --query "Command.CommandId" --output text 2>&1)
for i in {1..15}; do
  sleep 3
  S=$(aws ssm get-command-invocation --region us-west-1 --command-id "$CMD_ID" --instance-id "$TARGET" --query "Status" --output text 2>/dev/null)
  if [[ "$S" == "Success" ]]; then
    aws ssm get-command-invocation --region us-west-1 --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardOutputContent" --output text
    break
  elif [[ "$S" == "Failed" ]]; then
    aws ssm get-command-invocation --region us-west-1 --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardErrorContent" --output text
    break
  fi
  echo -n "."
done
