const db = require("../models");

module.exports = function (router) {
  router.get("/", function(req, res) {
    db.Article.find({})
      .sort({published: -1})
      .limit(10)
      .populate("comments")
      .then(function(dbResp) {
        const hbsOjb = {
          articles: dbResp
        }
        res.render("index", hbsOjb);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};