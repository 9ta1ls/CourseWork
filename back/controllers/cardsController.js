const deckModel = require("../models/deck")

const showCards = async (req, res) => {
    const deckId = req.params.id;
    const deckWithCards = await deckModel.findById(deckId);
    const name = deckWithCards.name;
    const cardsArr = deckWithCards.cards;
    res.render("cardsEjs", {cardsArr:cardsArr ,deckName:name, deck:deckWithCards, deckId: deckId});
};

const postCard = async (req, res) =>{
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
    setTimeout(() => {
        res.redirect(`/Cards/${deckId}`);
    }, 100);
}

const deleteCard = async(req, res)=>{
    const deckId = req.params.id;
    const cardId = req.params.cardId;
    deckModel.updateOne(  
        { _id: deckId },
        { $pull: { cards: { _id: cardId } } },
        (err, result) => {
        }
    )

    res.status(200).send();
}


module.exports = {
    showCards,
    postCard,
    deleteCard
};