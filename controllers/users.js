const db = require("../connect")
const jwt = require("jsonwebtoken");
const moment = require('moment')


 const getUser = (req, res) => {
    const userId = req.params.userId;
    // console.log(userId);
    const q = "SELECT * FROM users WHERE user_id=?";
  
    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      const {passw, ...info } = data[0];
      return res.json(info);
    });
  };


   const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "UPDATE USERS SET `name`=?,`CITY`=?,`WEBSITE`=?,=? WHERE user_id=? ";
        // console.log(req.body.coverpic)
      db.query(
        q,
        [
          req.body.name,
          req.body.city,
          req.body.website,
          userInfo.id,
        ],
        (err, data) => {
          if (err) res.status(500).json(err);
          if (data.affectedRows > 0) return res.json("Updated!");
          return res.status(403).json("You can update only your post!");
        }
      );
    });
  };


module.exports = {getUser,updateUser}
