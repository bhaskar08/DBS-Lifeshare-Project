const db = require("../connect")
const jwt = require("jsonwebtoken");
const moment = require('moment')

const getRelationships = (req,res)=>{

    const q = "SELECT FOLLOWERUSERID FROM RELATIONSHIPS WHERE FOLLOWEDUSERID = ?";
    db.query(q, [req.query.FOLLOWEDUSERID], (err, data) => {
      if (err) return res.status(500).json(err);
      // console.log(data);
      return res.status(200).json(data.map(relationship=>relationship.FOLLOWERUSERID));
    });
    
}


 const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO RELATIONSHIPS (`FOLLOWERUSERID`,`FOLLOWEDUSERID`) VALUES (?)";
      const values = [
        userInfo.id,
        req.body.userId
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Following");
      });
    });
  };
  
   const deleteRelationship = (req, res) => {
  
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "DELETE FROM RELATIONSHIPS WHERE `FOLLOWERUSERID` = ? AND `FOLLOWEDUSERID` = ?";
  
      db.query(q, [userInfo.id, req.query.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Unfollow");
      });
    });
  };


  module.exports={ getRelationships, addRelationship, deleteRelationship }
  
