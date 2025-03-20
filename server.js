const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let requestCount = 0;

// Middleware untuk menghitung request
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Endpoint utama
app.get("/", (req, res) => {
    res.send("L7 DSTAT Backend Running");
});

// Kirim data request ke frontend setiap detik
setInterval(() => {
    io.emit("update", { requests: requestCount });
    requestCount = 0;
}, 1000);

// Jalankan server di port 3000
server.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});
