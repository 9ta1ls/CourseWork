const express = require("express");
const router  = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const deckModel = require("../models/deck")

router.get("/",(req,res)=>{
    res.render("decks");
})

router.post("/",(req,res)=>{

})


router.put("/",(req,res)=>{
    
})


router.delete("/",(req,res)=>{
    
})


module.exports = router;