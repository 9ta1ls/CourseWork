const express = require("express");
const router  = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const deckModel = require("../models/deck")

router.get("/",async (req,res)=>{
    const decksArr = await deckModel.find();
    const decksWithCardCounts = decksArr.map(deck => ({
        name: deck.name,
        cardCount: deck.cards.length
      }));
    res.render("decksEjs",{decksArr: decksArr, decksWithCardCounts: decksWithCardCounts});
})

router.post("/",async (req,res)=>{
    const deckName = req.body.deckname;
    const deck = new deckModel ({
        name: deckName,
    });
    await deck.save();
    res.redirect("/Decks");
})

router.put("/:id",async (req,res)=>{
    
})


router.delete("/:id", async (req,res)=>{
    const deckId = req.params.id;
    await deckModel.findByIdAndDelete(deckId);
    res.status(200).send();
})


module.exports = router;