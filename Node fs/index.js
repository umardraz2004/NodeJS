import http from "http";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
// My code

const runningPort = process.env.PORT;

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plan" });
      res.end("Process started...");
      messageDisplayOnConsole("Creating a directory");
      fs.mkdir("organizedFiles", { recursive: true }, (err) => {
        if (err) {
          messageDisplayOnConsole("Error creating directory: " + err.message);
        } else {
          messageDisplayOnConsole("Directory created successfully!");
        }
      });
      fs.readdir("unorganizedFiles", (err, files) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error reading directory: " + err.message);
        } else {
          files.forEach((file) => {
            const fileExt = path.extname(file);
            const sourcePath = path.join("unorganizedFiles", file);
            let subDir;
            switch (fileExt) {
              case ".txt":
                subDir = "Text Files";
                break;
              case ".gif":
                subDir = "GIFs";
                break;
              case ".jpeg":
              case ".jpg":
                subDir = "JPEG Images";
                break;
              case ".png":
                subDir = "PNG Images";
                break;
              default:
                console.log(`File type not handled: ${file}`);
                return; // Skip unsupported file types
            }
            const destinationDir = path.join("organizedFiles", subDir);
            fs.mkdir(destinationDir, { recursive: true }, (err) => {
              if (err) {
                console.error(
                  `Error creating subdirectory for ${subDir}:`,
                  err.message
                );
                return;
              }
              const destinationPath = path.join(destinationDir, file);
              moveFile(sourcePath, destinationPath, (success) => {
                if (success) {
                  messageDisplayOnConsole(`File moved to ${destinationPath}`);
                } else {
                  console.error(`Failed to move file: ${file}`);
                }
              });
            });
          });
        }
      });
    } else {
      res.writeHead(404, "Content-Type", "text/plain");
      res.end("Requested Url Not Found");
    }
  } else {
    res.writeHead(405, "Content-Type", "text/plain");
    res.end("Method Not Allowed");
  }
});

server.listen(runningPort, () => {
  console.log(`Server is running on port ${runningPort}.✅`);
});

const moveFile = (source, destination, callback) => {
  fs.rename(source, destination, (err) => {
    if (err) {
      console.error("Error moving file:", err);
      callback(false);
    } else {
      console.log("File moved successfully:", source);
      callback(true);
    }
  });
};

const messageDisplayOnConsole = (message, timer = 0) => {
  setTimeout(() => {
    console.log(message);
  }, timer);
};
