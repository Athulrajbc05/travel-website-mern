const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: String,
  activities: [String],
  bestTimeToVisit: String,
  images: [String],
  attractions: [String]
});

module.exports = mongoose.model('Place', placeSchema);
