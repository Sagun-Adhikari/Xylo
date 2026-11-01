//responsible for manage server
const express= require('express')
const cors=require('cors')
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

app=express();
app.use(express.json())
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);



module.exports=app;