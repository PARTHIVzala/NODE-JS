const http = require("http");

// Server 1 – Main Website
const server1 = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Main Website Server Running");
});

// Server 2 – API Server
const server2 = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "API Server Running" }));
});

// Server 3 – Admin Server
const server3 = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Admin Panel Server");
});

// Listen on different ports
server1.listen(3000, () => console.log("Server 1 on port 3000"));
server2.listen(4000, () => console.log("Server 2 on port 4000"));
server3.listen(5000, () => console.log("Server 3 on port 5000"));
