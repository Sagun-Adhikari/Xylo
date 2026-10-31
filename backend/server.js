const app=require('./app')
require('dotenv').config();
const connectDB= require('./db/db')
async function startserver(){
    connectDB();
    PORT=process.env.PORT || 5000;
    await app.listen(PORT,()=>{
        console.log(`server start at ${PORT}`); 
    })
}
startserver()
