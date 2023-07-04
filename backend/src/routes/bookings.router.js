const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookings.controlles");

router
  .get("/", bookingsController.get)
  .post("/", bookingsController.create)
  .put("/:id", bookingsController.update)
  .delete("/:id", bookingsController._delete);

module.exports = router;
