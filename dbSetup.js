const mongoose = require("mongoose");

const dbName = "test";
// DB setup
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);

// schema
const userschema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
});

module.exports = mongoose.model("user", userschema);
