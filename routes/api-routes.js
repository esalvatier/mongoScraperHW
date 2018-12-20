const db = require("../models");

const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {
  app.get("/scrape", function(req, res) {
    axios.get("https://io9.gizmodo.com/").then(function(resp) {
      const $ = cheerio.load(resp.data);

      $("article").each(function(i, element) {
        if ($(".storytype-label-wrapper", element).length > 0 ) {
          let newArticle = {};
          newArticle.headline = $(element).find("h1.headline").text();
          newArticle.summary = $(element).find("div.entry-summary").text();
          newArticle.storyType = $(element).find("a.storytype-label").text();
          newArticle.link = $(element).find("a.js_entry-link").attr("href");
          db.Article.create(newArticle).then(function(dbResp) {
            console.log(dbResp);
          }).catch(function(err) {
            console.log(err.errmsg);
          });
        }
      });
    });
  });

};