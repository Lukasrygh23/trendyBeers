const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const BeerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  abv: {
    type: Number,
  },
  alcohol_free: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Beer = model('Beer', BeerSchema);

module.exports = {
  'Beer': Beer,
};
