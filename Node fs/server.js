import http from "http";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const runningPort = process.env.PORT;

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Process started...");

    try {
      console.log("Creating 'organizedFiles' directory...");
      await fs.mkdir("organizedFiles", { recursive: true });

      console.log("Reading 'unorganizedFiles' directory...");
      const files = await fs.readdir("unorganizedFiles");

      const promises = files.map(async (file) => {
        const fileExt = path.extname(file);
        const sourcePath = path.join("unorganizedFiles", file);
        let subDir;

        switch (fileExt) {
          case ".txt":
            subDir = "TextFiles";
            break;
          case ".gif":
            subDir = "GIFs";
            break;
          case ".jpeg":
          case ".jpg":
            subDir = "JPEGImages";
            break;
          case ".png":
            subDir = "PNGImages";
            break;
          default:
            subDir = "Others";
        }

        const destinationDir = path.join("organizedFiles", subDir);
        await fs.mkdir(destinationDir, { recursive: true });

        const destinationPath = path.join(destinationDir, file);
        await fs.rename(sourcePath, destinationPath);

        console.log(`Moved file: ${file} → ${destinationDir}`);
      });

      await Promise.all(promises);
      console.log("All files have been organized!");
    } catch (err) {
      console.error("Error during file organization:", err.message);
    }
  } else if (req.method === "GET") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Requested URL Not Found");
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
  }
});

server.listen(runningPort, () => {
  console.log(`Server is running on port ${runningPort}. ✅`);
});
