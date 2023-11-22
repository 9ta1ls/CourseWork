const express = require("express");
const router  = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const {validateToken} = require('../JWT/JWT');
const deckModel = require("../models/deck");

const cardsController = require("../controllers/cardsController");

//Відображення карток
router.get("/:id",validateToken ,cardsController.showCards);

//Додавання карток
router.post("/:id",validateToken ,cardsController.postCard);

//Видалення карток
router.delete("/:id/:cardId",validateToken ,cardsController.deleteCard);

//Відображення сторінки для вивчення
router.get("/:id/learning",validateToken , cardsController.loadLearingPage);

module.exports = router;