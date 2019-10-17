var Message = require("../models/messageModel");
var Number = require("../models/numberModel");

exports.smsControllerGet = (req, res, next) => {
  var perPage = 100;

  Message.find()
    .sort({
      sendAt: -1
    })
    .limit(perPage)
    .then(resx => {
      res.render("index", {
        data: resx,
        sendResult: req.flash("sns")
      });
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    });
};

exports.smsControllerPost = async (req, res, next) => {
  try {
    const msg = req.body.message;

    const Now = Date.now();
    req.flash("sns", "Message Sent Successfully Msg: " + msg);

    var number = await Number.find();

    var names = number;

    names.map(val => {
      var http = require("https");
      var options = {
        method: "POST",
        hostname: "api.msg91.com",
        port: null,
        path: "/api/v2/sendsms?country=91",
        headers: {
          authkey: "",
          "content-type": "application/json"
        }
      };
      var req = http.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });

      var finalMsg = String(
        "Dear " +
        val.name +
        "!\n" +
        msg +
        "Event is on 27/09/2019 to 28/09/2019"
      );

      var finalNum = [String(parseInt(val.mobile))];
      console.log(finalMsg, finalNum);
      req.write(
        JSON.stringify({
          sender: "SAMIKS",
          route: "4",
          country: "91",
          sms: [{
            message: finalMsg,
            to: finalNum
          }]
        })
      );

      req.end();
    });

    var message = new Message({
      message: msg,
      sendAt: Now
    });
    await message.save();
    res.redirect("/sms");
  } catch (error) {
    console.log(error);
  }
};