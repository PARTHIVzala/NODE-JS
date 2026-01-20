const http = require("http");

http.createServer((req, res) => {
  res.end("Website Server");
}).listen(3000);
