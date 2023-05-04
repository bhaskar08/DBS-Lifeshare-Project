const express = require('express');
const router=express.Router();
const {getpost, addpost}=require('../controllers/posts')

router.get('/',getpost);
router.post('/',addpost);


module.exports=router