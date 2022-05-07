const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema(
  {
    alpha_two_code: {
      type: String,
      required: [true, 'University code (two letter code) must be provide'],
    },
    web_pages: [],
    name: {
      type: String,
      required: [true, 'University name must be provide'],
    },
    country: {
      type: String,
      required: [true, 'The country name must be provide'],
    },
    domains: [],
    state_province: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Universities', universitySchema);
