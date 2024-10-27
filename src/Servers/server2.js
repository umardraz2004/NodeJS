import http from "http";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Jim Doe" },
];
const server = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(users));
    res.end();
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ message: "user Not found" }));
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ message: "route Not found" }));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
