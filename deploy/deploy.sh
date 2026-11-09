#!/usr/bin/env bash
# Pulls main, installs, builds, restarts hedomy-web. Run by the webhook (or by hand).
set -euo pipefail
cd /root/hedomy-web
git fetch -q origin main && git reset -q --hard origin/main
npm ci --no-audit --no-fund
npm run build
systemctl restart hedomy-web
for i in $(seq 1 20); do curl -sf -o /dev/null http://127.0.0.1:3100/ && echo "hedomy-web OK" && exit 0; sleep 1; done
echo "hedomy-web FAILED health check"; exit 1
