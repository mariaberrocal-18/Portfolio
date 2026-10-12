#!/usr/bin/env python3
"""Local preview server: never caches, and reloads the open page when files change."""
import hashlib, http.server, os, socketserver, sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
ROOT = os.path.dirname(os.path.abspath(__file__))
WATCH = ["index.html", "work", "assets/css", "assets/js", "assets/photos", "assets/logos"]

def fingerprint():
    h = hashlib.md5()
    for w in WATCH:
        p = os.path.join(ROOT, w)
        files = [p] if os.path.isfile(p) else [os.path.join(d, f) for d, _, fs in os.walk(p) for f in fs]
        for f in sorted(files):
            try:
                st = os.stat(f)
                h.update(f"{f}{st.st_mtime_ns}{st.st_size}".encode())
            except OSError:
                pass
    return h.hexdigest()

RELOAD = b"""<script>(function(){var v=null;setInterval(function(){fetch('/__v',{cache:'no-store'}).then(function(r){return r.text()}).then(function(t){if(v===null)v=t;else if(t!==v)location.reload()}).catch(function(){})},1500)})()</script>"""

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()

    def do_GET(self):
        path = self.path.split("?")[0]
        if path == "/__v":
            body = fingerprint().encode()
            self.send_response(200); self.send_header("Content-Type", "text/plain"); self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body); return
        local = self.translate_path(path)
        if os.path.isdir(local):
            local = os.path.join(local, "index.html")
        if local.endswith(".html") and os.path.isfile(local):
            body = open(local, "rb").read().replace(b"</body>", RELOAD + b"</body>")
            self.send_response(200); self.send_header("Content-Type", "text/html; charset=utf-8"); self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body); return
        super().do_GET()

    def log_message(self, *a):
        pass

socketserver.TCPServer.allow_reuse_address = True
with socketserver.ThreadingTCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}  (auto-reload on)")
    httpd.serve_forever()
