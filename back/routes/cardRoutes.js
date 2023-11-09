const express = require("express");
const router  = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const deckModel = require("../models/deck")
/* const cardModel = require("../models/card") */

const cardsController = require("../controllers/cardsController");

//Відображення карток
router.get("/:id",cardsController.showCards);

//Додавання карток
router.post("/:id",cardsController.postCard);

//Оновленя картки (можливо треба використати patch замість put)
router.put("/",(req,res)=>{
    
})
//Видалення карток
router.delete("/:id/:cardId",cardsController.deleteCard);

//Відображення сторінки для вивчення
router.get("/:id/learning", cardsController.loadLearingPage);

module.exports = router;