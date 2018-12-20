var express = require("express");

var router = express.Router();
require("../routes/api-routes")(router);
require("../routes/html-routes")(router);
module.exports = router;