const express = require("express");
const router  = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const deckModel = require("../models/deck")
const cardModel = require("../models/card")

router.get("/:id",async(req,res)=>{
    const deckId = req.params.id;
    const deckWithCards = await deckModel.findById(deckId).populate("cards");
    const cardsArr = deckWithCards.cards;
    res.render("cardsEjs", {cardsArr:cardsArr});
})

router.post("/:id",async(req,res)=>{
    
})


router.put("/",(req,res)=>{
    
})


router.delete("/",(req,res)=>{
    
})

module.exports = router;