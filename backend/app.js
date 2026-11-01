//responsible for manage server
const express= require('express')
const cors=require('cors')
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

app=express();
app.use(express.json())
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);



module.exports=app;