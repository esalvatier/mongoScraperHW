var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema= new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },

  summary: {
    type: String,
    required: true
  },

  storyType: {
    type: String,
    required: true
  },

  published: {
    type: Date,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;