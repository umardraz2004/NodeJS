import http from "http";
import dotenv from "dotenv";
dotenv.config();

const runningPort = process.env.PORT;

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(runningPort, () => {
  console.log(`Server is running on port ${runningPort}`);
});
