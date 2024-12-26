import http from "http";
import dotenv from "dotenv";
dotenv.config();

const runningPort = process.env.PORT;

const isLoggedIn = true;

const logger = (req, res, next) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  if (isLoggedIn) {
    next();
  } else {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Unauthorized" }));
  }
};

const server = http.createServer((req, res) => {
  logger(req, res, () => {
    if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "GET request" }));
    }
  });
});

server.listen(runningPort, () => {
  console.log(`Server is running on port ${runningPort}`);
});
