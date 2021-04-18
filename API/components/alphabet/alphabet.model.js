const mongoose = require("mongoose");
const alphabetSchema = new mongoose.Schema({
  img: {
    type:String,
  },
  alt: {
    type: String,
  },
  type: {
    type:String,
  },
  detail: {
    type: String,
  },
});

const Alphabet = mongoose.model("Alphabet", alphabetSchema);
module.exports = Alphabet;
