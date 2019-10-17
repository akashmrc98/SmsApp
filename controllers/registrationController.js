const User = require("../models/userModel");
const { validationResult } = require("express-validator");

exports.getRegistration = (req, res, next) => {
  var z = req.flash("data");
  var z = z[0];
  if (z === undefined) {
    var dataSantizer = {
      name: "",
      mobile: "",
      college: "",
      location: "",
      events: "",
      c1: "",
      c2: "",
      c3: ""
    };
    res.render("registration", {
      msg: req.flash("msg"),
      data: dataSantizer
    });
  } else {
    res.render("registration", {
      msg: req.flash("msg"),
      data: z
    });
  }
};

exports.postRegistration = async (req, res, next) => {
  try {
    var totalUsers = await User.count();
    totalUsers = totalUsers + 1;
    totalUsers = String(totalUsers);
    var sid = "Samiksha" + totalUsers;

    const errors = validationResult(req);
    var dataSantizer = {
      name: req.body.name,
      mobile: req.body.mobile,
      college: req.body.college,
      location: req.body.place,
      events: req.body.event,
      c1: req.body.c1,
      c2: req.body.c3,
      c3: req.body.c3
    };
    if (errors.isEmpty()) {
      let testCase1 = Array.isArray(req.body.event);
      if (testCase1 !== false) {
        var totalevents = req.body.event;
        totalevents = totalevents.length;
        amount = totalevents * 50;
        amount = amount + 100;
      } else {
        amount = 150;
      }
      user = new User({
        sid: sid,
        name: req.body.name,
        mobile: req.body.mobile,
        college: req.body.college,
        location: req.body.place,
        events: req.body.event,
        c1: req.body.c1,
        c2: req.body.c3,
        c3: req.body.c3,
        amount: amount
      });

      try {
        await user.save();
        // const userX = user;
        // console.log(userX);
        // var http = require("https");
        // var options = {
        //   method: "POST",
        //   hostname: "api.msg91.com",
        //   port: null,
        //   path: "/api/v2/sendsms?country=91",
        //   headers: {
        //     authkey: "295186AqZiirEwfMe75d85c64b",
        //     "content-type": "application/json"
        //   }
        // };
        // var reqx = http.request(options, function(res) {
        //   var chunks = [];
        //   res.on("data", function(chunk) {
        //     chunks.push(chunk);
        //   });

        //   res.on("end", function() {
        //     var body = Buffer.concat(chunks);
        //     console.log(body.toString());
        //   });
        // });

        // var finalMsg = String(
        //   "Dear " +
        // userX.name + "Your Id:" + userX.sid +
        //     "!\n" +
        //     "Thank you! for participating in the Samiksha2K19 Event."
        // );

        // var finalNum = [String(parseInt(userX.mobile))];

        // console.log(finalMsg, finalNum);

        // reqx.write(
        //   JSON.stringify({
        //     sender: "SMAIKS",
        //     route: "4",
        //     country: "91",
        //     sms: [{ message: finalMsg, to: finalNum }]
        //   })
        // );

        // reqx.end();
        req.flash("data", dataSantizer);
        req.flash("msg", "Registration Successfull!");
        res.redirect("/registration");
      } catch (error) {
        req.flash("data", dataSantizer);
        req.flash("msg", "User Already Exists");
        res.redirect("/registration");
        console.log(error);
      }
    } else {
      req.flash("data", dataSantizer);
      req.flash("msg", errors.errors[0].msg);
      res.redirect("/registration");
    }
  } catch (error) {
    console.log(error);
  }
};
