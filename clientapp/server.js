require("dotenv").config();
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0"; // Allow external connections for proxy
const port = 4000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Chạy server ở cổng 4000
app.prepare().then(() => {
  createServer((req, res) => {
    // Set CORS headers for proxy
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`✅ Ready on http://${hostname}:${port}`);
    console.log(`🌐 Access via proxy at: http://dtcshop.vn`);
  });
});
