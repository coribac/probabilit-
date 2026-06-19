const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 8091);
const HOST = "127.0.0.1";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  const filePath = path.join(__dirname, pathname === "/" ? "index.html" : pathname);
  const ext = path.extname(filePath);
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(error.code === "ENOENT" ? "404 - File not found" : "Server error");
      return;
    }
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(content);
  });
}).listen(PORT, HOST, () => {
  console.log(`Probabilities app running at http://${HOST}:${PORT}/`);
});
