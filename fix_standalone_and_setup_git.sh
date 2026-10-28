#!/bin/bash
# 1) Fix the standalone copy issue on EC2 (fixes 404s NOW)
# 2) Set up GitHub remote on EC2 so future deploys are: git pull + npm build
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"
GITHUB_REPO="https://github.com/valdezvictor/3demayo.git"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

wait_for() {
  local CMD_ID="$1" timeout="${2:-180}"
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
echo "  Step 1: Fix standalone copy on EC2"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":[
    "cd /opt/3demayo/web",
    "echo === checking standalone ===",
    "ls .next/standalone/ 2>/dev/null || echo NO_STANDALONE",
    "echo === copying static + public into standalone ===",
    "cp -r .next/static .next/standalone/.next/static 2>/dev/null && echo static_copied || echo static_skip",
    "cp -r public .next/standalone/public 2>/dev/null && echo public_copied || echo public_skip",
    "echo === ecosystem config ===",
    "cat /opt/3demayo/ecosystem.config.json",
    "echo === curl test ===",
    "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:3003/maestras && echo"
  ]}' \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Checking standalone..."
wait_for "$CMD_ID" 60
echo ""

echo "============================================"
echo "  Step 2: Init git on EC2 + set GitHub remote"
echo "============================================"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters "{\"commands\":[
    \"cd /opt/3demayo/web\",
    \"git init 2>/dev/null || echo already_git\",
    \"git remote remove origin 2>/dev/null; git remote add origin $GITHUB_REPO\",
    \"git remote -v\",
    \"echo GIT_REMOTE_SET\"
  ]}" \
  --query "Command.CommandId" --output text 2>&1)
echo -n "Setting up git remote..."
wait_for "$CMD_ID" 60
echo ""

echo "============================================"
echo "  Done. Now push from your Mac (next steps"
echo "  printed below)"
echo "============================================"
echo ""
echo "  On your Mac, cd into your local 3deMayo"
echo "  source folder and run:"
echo ""
echo "  git init"
echo "  git remote add origin $GITHUB_REPO"
echo "  git add ."
echo "  git commit -m 'Initial commit — 3deMayo site'"
echo "  git branch -M main"
echo "  git push -u origin main"
echo ""
echo "  Then future EC2 deploys become:"
echo "  bash deploy_from_git.sh"
