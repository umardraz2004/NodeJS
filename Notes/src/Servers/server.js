import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({message: 'Hello World!'}));
});

server.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
})