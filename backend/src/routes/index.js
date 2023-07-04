const express = require("express");

const bookingsRouter = require("./bookings.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/bookings", bookingsRouter);
}

module.exports = routerApi;
