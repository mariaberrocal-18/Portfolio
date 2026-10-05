#!/bin/bash
# Double-click to update the portfolio from GitHub and open it at http://localhost:4173
cd "$(dirname "$0")" || exit 1
echo "Updating from GitHub…"
git pull --ff-only || echo "(Could not update. Showing the version you already have.)"
lsof -ti:4173 | xargs kill 2>/dev/null
(sleep 1 && open "http://localhost:4173") &
echo "Serving at http://localhost:4173 (close this window to stop)"
python3 -m http.server 4173
