const connectToMongo = require("./db");
const express=require("express");
const cors=require("cors");
connectToMongo();
const app=express();

app.use(cors())
app.use(express.json()) //middleware to fetch req.body

app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

app.get("/",(req,res)=>{
    res.send("Hello world");
})
app.listen(5000,()=>{
    console.log("Server is running");
})