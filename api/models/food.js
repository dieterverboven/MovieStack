var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})

module.exports = mongoose.model('Food', foodSchema);