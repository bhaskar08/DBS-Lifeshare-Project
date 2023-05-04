const db = require("../connect")
const jwt = require("jsonwebtoken");
const moment = require('moment')


const getpost=(req,res)=>{
  const userId = req.query.userId;
    const token=req.cookies.accessToken;
    if(!token)return res.status(401).json("Not logges in!");
    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err)return res.status(403).json("Token is not valid");

        const q =
        userId !== "undefined"
          ? `SELECT P.*, U.USER_ID, NAME, PROFILEPIC AS USERID FROM POSTS AS P JOIN USERS AS U ON (U.USER_ID=P.USERID) WHERE P.USERID = ? ORDER BY P.CREATEDAT DESC`
          :'SELECT distinct P.*, U.USER_ID, NAME, PROFILEPIC AS USERID FROM POSTS AS P JOIN USERS AS U ON (U.USER_ID=P.USERID) LEFT JOIN RELATIONSHIPS AS R ON (P.USERID=R.FOLLOWEDUSERID) WHERE R.FOLLOWERUSERID=? OR P.USERID=? ORDER BY P.CREATEDAT DESC';
        
          const values =
          userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];
    
        db.query(q,values,(err,data)=>{
            if(err)return res.status(500).json(err);
            
            return res.status(200).json(data);
        })
    })
    
}


const addpost = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretKey", (err, userInfo) => {

      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO posts(`descr`, `img`, `userid`, `createdat`) VALUES (?)";

      console.log(req.body.img);
      const values = [
        req.body.descr,
        req.body.img,
        
        userInfo.id,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        // console.log(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"))
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created.");
      });
    });
  };

module.exports = {getpost, addpost}