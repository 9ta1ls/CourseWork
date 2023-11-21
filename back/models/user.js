const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required : true,
        unique: true
    },
    decks: [{
        type: Schema.Types.ObjectId,
        ref: 'cards'
    }]
});

module.exports = mongoose.model('users', userSchema);