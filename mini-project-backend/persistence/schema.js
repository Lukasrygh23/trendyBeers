const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const Beer = new Schema({
    "name": {
        type: String,
        required: true
    },
    "description": {
        type: String
    },
    "abv": {
        type: Number
    },
    "alcohol_free": {
        type: Boolean,
        required: true
    },
    "type": {
        type: String,
        required: true
    }

})

const Beer = model('Beer', Beer)

module.exports = {
    'Beer': Beer
}