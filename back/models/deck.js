const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cards = require('./card');


const deckSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    cards:[{
        type: Schema.Types.ObjectId,
        ref:'cards'
    }]
});

module.exports = mongoose.model('decks', deckSchema);