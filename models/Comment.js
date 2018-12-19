var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;