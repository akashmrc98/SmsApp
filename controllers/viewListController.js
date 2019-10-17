const Numbers = require("../models/numberModel");
const User = require("../models/userModel");

exports.getList = (req, res, next) => {
  Numbers.find()
    .then(resx => {
      res.render("list", {
        data: resx
      });
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    });
};

exports.getUserList = (req, res, next) => {
  User.find()
    .then(resx => {
      res.render("userList", {
        data: resx
      });
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    });
};
