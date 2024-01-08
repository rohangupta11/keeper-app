const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const mongoURI=process.env.DATABASE;

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((error)=>{
        console.log("Cant connect to DB- ",error);
    })
}
module.exports= connectToMongo;
