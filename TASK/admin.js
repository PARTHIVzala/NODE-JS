const http = require("http");

http.createServer((req, res) => {
  res.end("Admin Server");
}).listen(5000);
