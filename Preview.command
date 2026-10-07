#!/bin/bash
# Double-click ONCE. It keeps itself up to date from GitHub and the open page reloads on its own.
cd "$(dirname "$0")" || exit 1
echo "Updating from GitHub…"
git pull --ff-only -q || echo "(Could not update right now. Showing the version you already have.)"
# keep pulling in the background every 15 seconds
( while true; do sleep 15; git pull --ff-only -q >/dev/null 2>&1; done ) &
PULLER=$!
trap 'kill $PULLER 2>/dev/null; exit' INT TERM EXIT
lsof -ti:4173 | xargs kill 2>/dev/null
(sleep 1 && open "http://localhost:4173") &
echo "Open at http://localhost:4173. Leave this window open; close it to stop."
python3 serve.py 4173
