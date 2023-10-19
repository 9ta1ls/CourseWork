const express = require("express");
const router  = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const deckModel = require("../models/deck")

router.get("/",(req,res)=>{
    res.render("decks");
})

router.post("/",async (req,res)=>{
    const deck = new deckModel ({
        name: req.body.inputDeck_id,
    });
    await deck.save();
})

router.put("/",(req,res)=>{
    
})


router.delete("/",(req,res)=>{
    
})


module.exports = router;