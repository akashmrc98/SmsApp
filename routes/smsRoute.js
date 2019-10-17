var smsController = require("../controllers/smsController");
var express = require("express");
var route = express.Router();

route.get("/sms", smsController.smsControllerGet);
route.post("/sms", smsController.smsControllerPost);

module.exports = route;
