import http from "http";
import dotenv from "dotenv";
import path from "path";
import url from "url";
import fs from "fs/promises";
dotenv.config();

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;
const server = http.createServer(async(req, res) => {
  try {
    if (req.method === "GET") {
        let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "home.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
      } else {
        throw new Error('not found');
      }
      const data = await fs.readFile(filePath);
      res.setHeader('Content-Type', 'text/html');
      res.write(data);
      res.end();
    } else {
      throw new Error("not a valid request");
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
