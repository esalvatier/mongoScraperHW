var mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

module.exports = function (router) {
  router.get("/scrape", function(req, res) {
    axios.get("https://io9.gizmodo.com/").then(function(resp) {
      const $ = cheerio.load(resp.data);

      $("article").each(function(i, element) {
        if ($(".storytype-label-wrapper", element).length > 0 ) {
          let newArticle = {};
          newArticle.headline = $(element).find("h1.headline").text();
          newArticle.summary = $(element).find("div.entry-summary").text();
          newArticle.storyType = $(element).find("a.storytype-label").text();
          newArticle.published = new Date($(element).find("time.meta__time").attr("datetime"));
          newArticle.author = $(element).find("div.js_meta-byline").text();
          newArticle.link = $(element).find("a.js_entry-link").attr("href");
          db.Article.create(newArticle).then(function(dbResp) {
            res.json(dbResp);
          }).catch(function(err) {
            if (err.code !== 11000){
              console.log(err.errmsg);
            }
          });
        }
      });
    });
  });

  router.post("/submit", function(req, res) {
    const findID = mongojs.ObjectId(req.body.id);
    db.Comment.create(req.body.comment).then(function(dbNewComment) {
      return db.Article.findOneAndUpdate({_id: findID}, { $push: { comments: dbNewComment._id } }, { new: true });
    })
    .then(function(dbResp) {
      res.redirect('back');
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
  });
};