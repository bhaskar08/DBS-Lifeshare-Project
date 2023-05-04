const express = require('express');
const router=express.Router();
const { getRelationships, addRelationship, deleteRelationship }=require('../controllers/relationship')


router.get("/", getRelationships)
router.post("/", addRelationship)
router.delete("/", deleteRelationship)


module.exports=router