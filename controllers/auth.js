const jwt = require("jsonwebtoken");
const db = require("../connect")
const bcrypt=require('bcrypt')



const register=(req,res)=>{
   //   check if user exists
     const q="SELECT * FROM USERS WHERE USERNAME=?";
     db.query(q,[req.body.username],(err,data)=>{
        if(err)return res.status(500).json(err)
        if(data.length) return res.status(409).json('User already exists')

      //   create user
      //   hash password
         const salt=bcrypt.genSaltSync(10);
         const hashedPassword=bcrypt.hashSync(req.body.passw,salt);

         const q="INSERT INTO USERS (username,email,passw,name) VALUE(?);";
         const values=[req.body.username,req.body.email,hashedPassword,req.body.name];
         db.query(q,[values],(err,data)=>{
            if(err)return res.status(500).json(err)

            return res.status(200).json('USER HAS BEEN CREATED');
         })

     })
     
}


const login=(req,res)=>{

   //query for find the user
   const q="SELECT * FROM USERS WHERE USERNAME=?";

   db.query(q,[req.body.username],(err,data)=>{
      if(err)return res.status(500).json(err);
      if(data.length==0)return res.status(404).json("User not found");

      //comparing passwords
      const checkPassword=bcrypt.compareSync(req.body.passw,data[0].passw);

      //condition if password is wrong
      if(!checkPassword)return res.status(400).json("Wrong Password or username");

      //generating a token for the user according to user id
      // console.log(data[0].user_id);
      const token=jwt.sign({id : data[0].user_id}, "secretKey");

      const {passw , ...others}=data[0];


      //send the token in response as a cookie
      res.cookie("accessToken",token,{
         httpOnly:true,
      }).status(200).json(others);

   })
}


const logout=(req,res)=>{

   res.clearCookie("accessToken",{
      secure:true,
      sameSite:"none"

   }).status(200).json("User has been loged out");
}

module.exports={register,login,logout}