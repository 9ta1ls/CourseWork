const express = require("express");
const router  = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const {validateToken} = require('../JWT/JWT');

const deckModel = require("../models/deck")

const decksController = require("../controllers/decksController");

//Відображення колод
router.get("/",validateToken ,decksController.showDecks);

//Додавання колод
router.post("/",validateToken ,decksController.postDeck);

//Оновлення картки
router.put("/:id",validateToken ,decksController.updateDeck);

//Видалення картки
router.delete("/:id",validateToken , decksController.deleteDeck);


module.exports = router;