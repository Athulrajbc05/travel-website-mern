const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  priceRange: { type: String, required: true }
});

module.exports = mongoose.model('Hotel', hotelSchema);
