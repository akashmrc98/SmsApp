const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const editRoute = require("../controllers/editController");
const ListRoute = require("../controllers/viewListController");

router.get("/update", editRoute.getUpdate);
router.post(
  "/update/:id",
  [
    check("mobile")
      .isLength({ min: 10, max: 12 })
      .withMessage("Number Must be Numeric and 10 digits"),
    check("event")
      .exists()
      .withMessage("Select Event!")
  ],
  editRoute.postUpdate
);
router.get("/update/:id", editRoute.getFinalUpdate);
router.get("/list", ListRoute.getList);
router.get("/user-list", ListRoute.getUserList);

module.exports = router;
