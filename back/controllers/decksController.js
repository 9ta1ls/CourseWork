const deckModel = require('../models/deck');
const userModel = require('../models/user');
const {verify} = require('jsonwebtoken');
require('dotenv').config();


 function returnUserId(req){
    const accessToken = req.cookies["access-token"];
    const decoded = verify(accessToken, process.env.JWT_SECRET);
    return decoded.id;
};

async function isDeckInUser(req, res, deckId){
    const userId = returnUserId(req);
    const user = await userModel.findById(userId);
    if(!user.decks.includes(deckId))
        return false
};

const showDecks = async(req, res) =>{
    const userId = returnUserId(req)
    const user = await userModel.findById(userId).populate('decks');
    const decksArr = user.decks;
    res.render("decksEjs",{decksArr: decksArr});
};

const postDeck = async (req, res) =>{
    const deckName = req.body.deckname;
    const deck = new deckModel ({
        name: deckName,
    });
    await deck.save();
    const deckId = deck._id;
    const userId = returnUserId(req)
    await userModel.findByIdAndUpdate(userId, { $push: { decks: deckId } });
    res.redirect("/decks");
};

const updateDeck = async (req, res) =>{
    const deckId = req.params.id;
    const newName = req.body.name;
    const update = {name: newName};
    const updateDeck = await deckModel.findByIdAndUpdate(deckId,update, { new: true })
    res.json(updateDeck);
};

const deleteDeck = async (req, res) =>{
    const deckId = req.params.id;
    await deckModel.findByIdAndDelete(deckId);
    res.status(200).send();
};

module.exports = {
   showDecks,
   postDeck,
   updateDeck,
   deleteDeck
};