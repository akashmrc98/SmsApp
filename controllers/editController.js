const User = require("../models/userModel");
const { validationResult } = require("express-validator");

exports.getUpdate = async (req, res, next) => {
  try {
    const user = await User.findOne({ mobile: req.query.mobilex });
    req.session.phone = req.query.mobilex;
    res.render("update", {
      user: user,
      msg: req.flash("msg")
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

exports.getFinalUpdate = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("update", {
      user: user,
      msg: req.flash("msg"),
      user: user
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

exports.postUpdate = async (req, res, next) => {
  try {
    const authsVer = req.params.id;
    const errors = validationResult(req);
    var amount = 0;
    if (errors.isEmpty()) {
      let testCase1 = Array.isArray(req.body.event);
      if (testCase1 !== false) {
        var totalevents = req.body.event;
        totalevents = totalevents.length;
        console.log(totalevents);
        amount = totalevents * 50;
        amount = amount + 100;
      } else {
        amount = 150;
      }

      const author = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            college: req.body.college,
            location: req.body.place,
            mobile: req.body.mobile,
            events: req.body.event,
            c1: req.body.c1,
            c2: req.body.c2,
            c3: req.body.c3,
            amount: amount
          }
        }
      );
      await author.save();
      req.flash("msg", "Update Successful!");
      res.redirect("/update/" + author._id);
    } else {
      req.flash("msg", errors.errors[0].msg);
      res.redirect("/update/" + authsVer);
    }
  } catch (error) {
    err => {
      if (err) {
        console.log(err);
      }
    };
  }
};
