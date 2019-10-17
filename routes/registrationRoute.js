const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const registrationController = require("../controllers/registrationController");

router.get("/registration", registrationController.getRegistration);
router.post(
  "/registration",
  [
    check("mobile")
      .isLength({ min: 10, max: 12 })
      .withMessage("Number Must be Numeric and 10 digits"),
    check("event")
      .exists()
      .withMessage("Select Event!")
  ],
  registrationController.postRegistration
);

module.exports = router;
