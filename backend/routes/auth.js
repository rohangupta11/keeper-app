const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const fetchUser=require("../middleware/fetchUser");
const dotenv=require("dotenv");
dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;

//ROUTE 1:Create a user using POST "api/auth/createuser". Doesnt need authorisation
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req); // to validate user entered information is correct or not. this "errors" will catch the request body errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() }); //will send the error of validation which occured due to users wrong req body
    }

    try {
    //check whether user with this email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        //if exists then send status 400 and return
        return res
          .status(400)
          .json({ success,errors: "Sorry a user with this email already exists" });
      }

      //hashing and salting the password to be inserted in db
      const salt=await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt);
      //else add the user to database
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data={
        user:{
            id:user.id
        }
      }
      const authToken= jwt.sign(data,JWT_SECRET); //whenever a user logs in he is authenticated, and the server sends him a token. now when that user wants to access a service he will req the server and also send back the recieved token to verify that he is the same person who logged in before and he has access to that service/resource
      //the server adds the secret key to the token before sending it to the client so that whenever the server recieves back the token on another request, it can authorize the user. if user changed info of token then new signature(payload+header) will not match of actual signature.
      //sending the user entered data to the client
      success=true;
      res.json({success,authToken});
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    }
    // const user=User(req.body);
    // user.save();
  }
);


//ROUTE 2: Authenticate a user using POST "api/auth/login".No login required
router.post(
    "/login",[
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
    ],
    async(req,res)=>{
        let success=false;
        const errors = validationResult(req); // to validate user entered information is correct or not. this "errors" will catch the request body errors
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() }); //will send the error of validation which occured due to users wrong req body
        }
        const {email,password} = req.body;
        try{
            let user = await User.findOne({ email }); //equivalent to {email:email}
            if (!user) {
                //if no such user exists then send status 400 and return
                return res
                .status(400)
                .json({success,errors: "Please try to login with correct credentials" });
            }
            const passwordCompare=await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res
                .status(400)
                .json({success,errors: "Please try to login with correct credentials" });
            }
            const data={
                user:{
                    id:user.id //passing user's id to his token
                }
            }
            const authToken= jwt.sign(data,JWT_SECRET);
            success=true;
            res.json({success,authToken});
        }
        catch(err)
        {
            console.log(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

//ROUTE 3: Get logged in user details using POST "api/auth/getUser". login required
router.post(
    "/getUser",
    fetchUser,
    async(req,res)=>{
        try{
            userId=req.user.id;
            const user= await User.findById(userId).select("-password")
            res.send(user);
        }
        catch(err)
        {
            console.log(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);


module.exports = router;
