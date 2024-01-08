const connectToMongo = require("./db");
const express=require("express");
const cors=require("cors");
connectToMongo();
const app=express();
const dotenv=require("dotenv");
dotenv.config();
const PORT=process.env.PORT || 5000;

app.use(cors())
app.use(express.json()) //middleware to fetch req.body

app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

app.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Credentials","true")
    res.send("Api is running...");
})
app.listen(PORT,()=>{
    console.log("Server is running");
})