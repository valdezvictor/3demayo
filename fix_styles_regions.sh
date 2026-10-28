#!/bin/bash
# ================================================================
# 3deMayo: Fix Styles + All 12 Regions + Rebuild
# Run from 3demayo_deploy/ directory on your Mac
# ================================================================
TARGET="i-0bea4767802cff93b"
REGION="us-west-1"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

# macOS-safe base64
encode() {
  if [[ "$(uname)" == "Darwin" ]]; then base64 -i "$1"; else base64 -w0 "$1"; fi
}

run_b64() {
  local step="$1" desc="$2" src="$3" dest="$4"
  echo -e "\n${YELLOW}[$step] $desc${NC}"
  [[ ! -f "$DIR/$src" ]] && { echo -e "${RED}Missing: $DIR/$src${NC}"; exit 1; }
  local B64; B64=$(encode "$DIR/$src")
  local CMD_ID
  CMD_ID=$(aws ssm send-command \
    --region "$REGION" --instance-ids "$TARGET" \
    --document-name "AWS-RunShellScript" \
    --parameters "{\"commands\":[\"echo '$B64' | base64 -d > $dest && wc -c $dest\"]}" \
    --comment "$desc" --query "Command.CommandId" --output text 2>&1)
  [[ $? -ne 0 ]] && { echo -e "${RED}$CMD_ID${NC}"; exit 1; }
  echo -n "  Waiting..."
  for i in {1..20}; do
    sleep 3
    local STATUS; STATUS=$(aws ssm get-command-invocation --region "$REGION" \
      --command-id "$CMD_ID" --instance-id "$TARGET" --query "Status" --output text 2>/dev/null)
    if [[ "$STATUS" == "Success" ]]; then
      local OUT; OUT=$(aws ssm get-command-invocation --region "$REGION" \
        --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardOutputContent" --output text 2>/dev/null)
      echo -e " ${GREEN}✓ $OUT${NC}"; return 0
    elif [[ "$STATUS" == "Failed" || "$STATUS" == "TimedOut" ]]; then
      local ERR; ERR=$(aws ssm get-command-invocation --region "$REGION" \
        --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardErrorContent" --output text 2>/dev/null)
      echo -e " ${RED}✗ $ERR${NC}"; exit 1
    fi
    echo -n "."
  done
  exit 1
}

run_cmd() {
  local step="$1" desc="$2" cmd="$3" timeout="${4:-60}"
  echo -e "\n${YELLOW}[$step] $desc${NC}"
  local CMD_ID
  CMD_ID=$(aws ssm send-command \
    --region "$REGION" --instance-ids "$TARGET" \
    --document-name "AWS-RunShellScript" \
    --parameters "{\"commands\":[\"$cmd\"]}" \
    --timeout-seconds "$timeout" \
    --comment "$desc" --query "Command.CommandId" --output text 2>&1)
  [[ $? -ne 0 ]] && { echo -e "${RED}$CMD_ID${NC}"; exit 1; }
  echo -n "  Waiting..."
  local max_iter=$(( timeout / 3 + 5 ))
  for i in $(seq 1 $max_iter); do
    sleep 3
    local STATUS; STATUS=$(aws ssm get-command-invocation --region "$REGION" \
      --command-id "$CMD_ID" --instance-id "$TARGET" --query "Status" --output text 2>/dev/null)
    if [[ "$STATUS" == "Success" ]]; then
      local OUT; OUT=$(aws ssm get-command-invocation --region "$REGION" \
        --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardOutputContent" --output text 2>/dev/null)
      echo -e " ${GREEN}✓${NC}"; [[ -n "$OUT" ]] && echo "  → $OUT"; return 0
    elif [[ "$STATUS" == "Failed" || "$STATUS" == "TimedOut" ]]; then
      local ERR; ERR=$(aws ssm get-command-invocation --region "$REGION" \
        --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardErrorContent" --output text 2>/dev/null)
      echo -e " ${RED}✗ $ERR${NC}"; exit 1
    fi
    echo -n "."
  done
  exit 1
}

echo "================================================================"
echo "  3deMayo: Fix Styles + All 12 Regions"
echo "================================================================"

# ── 1. globals.css ──────────────────────────────────────────────
run_b64 "1/5" "Write globals.css" \
  "globals.css" "/opt/3demayo/web/app/globals.css"

# ── 2. tailwind.config.ts ───────────────────────────────────────
run_b64 "2/5" "Write tailwind.config.ts" \
  "tailwind.config.ts" "/opt/3demayo/web/tailwind.config.ts"

# ── 3. postcss.config.js ────────────────────────────────────────
run_b64 "3/5" "Write postcss.config.js" \
  "postcss.config.js" "/opt/3demayo/web/postcss.config.js"

# ── 4. Fix DB: add country column + seed all 12 regions ─────────
# Inline SQL — add country column then re-run the insert without it,
# using a simplified version that uses only existing columns
run_cmd "4/5" "Fix DB: add country column + seed 12 regions" \
'PGPASSWORD="cv2026Vivo" psql -h cv-prod-db.cyfiieky5gzb.us-west-1.rds.amazonaws.com -U cvadmin -d cafevivo_prod -p 5432 --set sslmode=require -c "
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS country VARCHAR(60) DEFAULT '\''Mexico'\'';
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS nom_prefix VARCHAR(10);
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS terroir_es TEXT;
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS terroir_en TEXT;
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS flavor_profile TEXT[];
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS elevation_range VARCHAR(60);
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS climate VARCHAR(80);
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;
INSERT INTO palenque_regions (name, slug, country, nom_prefix, terroir_es, terroir_en, flavor_profile, elevation_range, climate, active) VALUES
('\''Oaxaca'\'','\''oaxaca'\'','\''Mexico'\'','\''O'\'','\''Valles Centrales, Sierra Sur. La cuna del mezcal. Suelos volcánicos, 80% de la producción nacional.'\'','\''Central Valleys, Sierra Sur. The cradle of mezcal. Volcanic soils, 80% of national production.'\'',ARRAY['\''smoky'\'','\''earthy'\'','\''tropical'\'','\''complex'\''],'\''1200-2500 msnm'\'','\''Cálido semiárido'\'',true),
('\''Guerrero'\'','\''guerrero'\'','\''Mexico'\'','\''G'\'','\''Sierra Madre del Sur. Suelos tropicales, agave cupreata silvestre.'\'','\''Sierra Madre del Sur. Tropical soils, wild agave cupreata.'\'',ARRAY['\''wild'\'','\''herbal'\'','\''smoky'\''],'\''800-2200 msnm'\'','\''Tropical húmedo'\'',true),
('\''Durango'\'','\''durango'\'','\''Mexico'\'','\''D'\'','\''Sierra Madre Occidental. Bosques de pino-encino, agave durangensis.'\'','\''Sierra Madre Occidental. Pine-oak forests, agave durangensis.'\'',ARRAY['\''piney'\'','\''dry'\'','\''mineral'\''],'\''1800-2800 msnm'\'','\''Semicontinental'\'',true),
('\''Michoacán'\'','\''michoacan'\'','\''Mexico'\'','\''M'\'','\''Sierras del oriente. Suelos volcánicos. Tradición purépecha.'\'','\''Eastern ranges. Volcanic soils. Purépecha tradition.'\'',ARRAY['\''fruity'\'','\''earthy'\'','\''floral'\''],'\''1400-2200 msnm'\'','\''Templado'\'',true),
('\''San Luis Potosí'\'','\''san-luis-potosi'\'','\''Mexico'\'','\''S'\'','\''Altiplano potosino. Agave salmiana en el semidesierto.'\'','\''Potosí highland. Agave salmiana in the semiarid zone.'\'',ARRAY['\''desert'\'','\''sweet'\'','\''mineral'\''],'\''900-2200 msnm'\'','\''Árido a semiárido'\'',true),
('\''Zacatecas'\'','\''zacatecas'\'','\''Mexico'\'','\''Z'\'','\''Altiplano central. Suelos pedregosos, agave salmiana.'\'','\''Central highland. Rocky soils, agave salmiana.'\'',ARRAY['\''mineral'\'','\''dry'\'','\''citrus'\''],'\''2000-2800 msnm'\'','\''Árido continental'\'',true),
('\''Guanajuato'\'','\''guanajuato'\'','\''Mexico'\'','\''U'\'','\''Norte de Guanajuato. Región emergente de alta calidad.'\'','\''Northern Guanajuato. Emerging high-quality region.'\'',ARRAY['\''sweet'\'','\''roasted'\'','\''mineral'\''],'\''1700-2400 msnm'\'','\''Semiárido'\'',true),
('\''Tamaulipas'\'','\''tamaulipas'\'','\''Mexico'\'','\''T'\'','\''Sierra de Tamaulipas. Agave envolvens subtropical.'\'','\''Sierra de Tamaulipas. Subtropical agave envolvens.'\'',ARRAY['\''tropical'\'','\''light'\'','\''floral'\''],'\''400-1200 msnm'\'','\''Subtropical'\'',true),
('\''Aguascalientes'\'','\''aguascalientes'\'','\''Mexico'\'','\''A'\'','\''La región mezcalera más pequeña. Agave salmiana.'\'','\''The smallest mezcal region. Agave salmiana.'\'',ARRAY['\''sweet'\'','\''mild'\'','\''clean'\''],'\''1800-2200 msnm'\'','\''Semiárido'\'',true),
('\''Estado de México'\'','\''estado-de-mexico'\'','\''Mexico'\'','\''E'\'','\''Sur del Estado de México. Alta altitud volcánica.'\'','\''Southern Estado de México. High volcanic altitude.'\'',ARRAY['\''earthy'\'','\''roasted'\'','\''mineral'\''],'\''2200-3000 msnm'\'','\''Templado frío'\'',true),
('\''Sinaloa'\'','\''sinaloa'\'','\''Mexico'\'','\''L'\'','\''Sierra Madre de Sinaloa. Influencia costera del Pacífico.'\'','\''Sinaloa Sierra Madre. Pacific coastal influence.'\'',ARRAY['\''coastal'\'','\''fresh'\'','\''light-smoke'\''],'\''600-1800 msnm'\'','\''Tropical a semiárido'\'',true)
ON CONFLICT (slug) DO UPDATE SET terroir_es=EXCLUDED.terroir_es, terroir_en=EXCLUDED.terroir_en, flavor_profile=EXCLUDED.flavor_profile, active=true;
SELECT COUNT(*) as region_count FROM palenque_regions;
" 2>&1 | tail -10' \
  90

# ── 5. Rebuild Next.js + PM2 restart ────────────────────────────
echo -e "\n${YELLOW}[5/5] npm build + PM2 restart (2-3 min)${NC}"
CMD_ID=$(aws ssm send-command \
  --region "$REGION" --instance-ids "$TARGET" \
  --document-name "AWS-RunShellScript" \
  --parameters '{"commands":["cd /opt/3demayo/web && npm install tailwindcss autoprefixer postcss --save-dev 2>&1 | tail -3 && rm -rf .next && npm run build 2>&1 | tail -15 && pm2 restart /opt/3demayo/ecosystem.config.json && echo REBUILD_OK"]}' \
  --timeout-seconds 360 \
  --comment "3deMayo rebuild with Tailwind fix" \
  --query "Command.CommandId" --output text 2>&1)
echo "  ID: $CMD_ID"
echo -n "  Building..."
for i in {1..80}; do
  sleep 5
  STATUS=$(aws ssm get-command-invocation --region "$REGION" --command-id "$CMD_ID" --instance-id "$TARGET" --query "Status" --output text 2>/dev/null)
  if [[ "$STATUS" == "Success" ]]; then
    OUT=$(aws ssm get-command-invocation --region "$REGION" --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardOutputContent" --output text 2>/dev/null)
    echo -e " ${GREEN}✓ REBUILT${NC}"
    echo "$OUT"
    break
  elif [[ "$STATUS" == "Failed" || "$STATUS" == "TimedOut" ]]; then
    ERR=$(aws ssm get-command-invocation --region "$REGION" --command-id "$CMD_ID" --instance-id "$TARGET" --query "StandardErrorContent" --output text 2>/dev/null)
    echo -e " ${RED}✗ $ERR${NC}"; exit 1
  fi
  echo -n "."
done

echo ""
echo -e "${GREEN}================================================================"
echo "  DONE — site should now have full dark styles"
echo "  Verify: curl http://54.241.20.166:3003/"
echo "  Should show HTML with bg-[#080808] body class"
echo -e "================================================================${NC}"
