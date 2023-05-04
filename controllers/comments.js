const jwt = require("jsonwebtoken");
const db = require("../connect")
const bcrypt=require('bcrypt');
const moment = require('moment')


const getcomments=(req,res)=>{
    const q = `SELECT c.*, u.user_id AS user_id, name, profilePic FROM comments AS c JOIN users AS u ON (u.user_id = c.COMMENTUSERID)
    WHERE c.POSTID = ? ORDER BY c.createdat DESC
    `;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


const addComment = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO comments(`DESCR`, `CREATEDAT`, `COMMENTUSERID`, `POSTID`) VALUES (?)";
      const values = [
        req.body.descr,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.body.postId
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created.");
      });
    });
  };

module.exports={getcomments,addComment}