const express = require("express");
const router  = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const deckModel = require("../models/deck")
/* const cardModel = require("../models/card") */

router.get("/:id",async(req,res)=>{
    const deckId = req.params.id;
    const deckWithCards = await deckModel.findById(deckId);
    const name = deckWithCards.name;
    const cardsArr = deckWithCards.cards;
    res.render("cardsEjs", {cardsArr:cardsArr ,deckName:name, deck:deckWithCards});
})

router.post("/:id",async(req,res)=>{
    const newQuestion = req.body.question;
    const newAnswer = req.body.answer;
    const newCard = {
        question: newQuestion,
        answer: newAnswer
    }
    const deckId = req.params.id;
     deckModel.findById(deckId, async(err, deck) => {
        if(err)
            return err;
         await deck.cards.push(newCard);
         await deck.save();
    })
    res.redirect(`/Cards/${deckId}`);
})


router.put("/",(req,res)=>{
    
})


router.delete("/",(req,res)=>{
    
})

module.exports = router;