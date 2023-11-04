const express = require("express");
const router  = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const deckModel = require("../models/deck")
/* const cardModel = require("../models/card") */

const decksController = require("../controllers/decksController");

//Відображення колод
router.get("/",decksController.showDecks);

//Додавання колод
router.post("/",decksController.postDeck);

//Оновлення картки
router.put("/:id",decksController.updateDeck);

//Видалення картки
router.delete("/:id", decksController.deleteDeck);


module.exports = router;