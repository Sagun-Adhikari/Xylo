//responsible for manage server
const express= require('express')
const cors=require('cors')
const authRoutes = require("./routes/authRoutes");

app=express();
app.use(express.json())
app.use(cors());
app.use("/api/auth", authRoutes);


module.exports=app;