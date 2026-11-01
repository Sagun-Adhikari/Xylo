require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const connectDB = require("./db/db");
const app = require("./app");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.use(function (socket, next) {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Authentication required"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        next();
    } catch (error) {
        next(new Error("Invalid token"));
    }
});

io.on("connection", function (socket) {
    console.log("User connected:", socket.userId);

    socket.join(socket.userId);

    socket.on("disconnect", function () {
        console.log("User disconnected:", socket.userId);
    });
});

app.set("io", io);

const PORT = process.env.PORT || 5000;

connectDB().then(function () {
    server.listen(PORT, function () {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});