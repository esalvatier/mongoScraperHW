const db = require("../models");

module.exports = function (router) {
  router.get("/", function(req, res) {
    db.Article.find({})
      .sort({published: -1})
      .limit(10)
      .populate("comments")
      .then(function(dbResp) {
        const hbsObj = {
          articles: dbResp,
          offset: {
            active: false,
            prev: "/",
            nextActive: true,
            next: "next/" + 10
          }
        }
        res.render("index", hbsObj);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  router.get("/next/:offset", function(req, res) {
    const offset = parseInt(req.params.offset);
    let prevStr;
    if (offset === 10) {
      prevStr = "/";
    } else {
      prevStr = "/next/" + (offset - 10);
    }
    db.Article.find({})
      .sort({published: -1})
      .skip(offset)
      .limit(10)
      .populate("comments")
      .then(function(dbResp) {
        const hbsObj = {
          articles: dbResp,
          offset: {
            prevActive: true,
            prev: prevStr,
            nextActive: true,
            next: "/next/" + (offset + 10)
          }
        }
        if (dbResp.length < 10) {
          hbsObj.offset.nextActive = false;
        }
        console.log()
        res.render("index", hbsObj);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};