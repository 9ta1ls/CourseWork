const deckModel = require("../models/deck")

const showDecks = async(req, res) =>{
    const decksArr = await deckModel.find();
    res.render("decksEjs",{decksArr: decksArr});
};

const postDeck = async (req, res) =>{
    const deckName = req.body.deckname;
    const deck = new deckModel ({
        name: deckName,
    });
    await deck.save();
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