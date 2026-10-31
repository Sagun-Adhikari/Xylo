//responsible for manage server
const express= require('express')
const cors=require('cors')

app=express();
app.use(express.json())
app.use(cors());

module.exports=app;