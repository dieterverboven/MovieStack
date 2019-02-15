var mongoose = require('mongoose');

var drinkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    size: String
})

module.exports = mongoose.model('Drink', drinkSchema);