const express = require('express');
const router=express.Router();
const {getcomments, addComment}=require('../controllers/comments')

router.get('/',getcomments);
router.post("/", addComment);

module.exports=router