const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
},{ timestamps: true });

module.exports = mongoose.model("Url", urlSchema);
