const { Booking, BookingSchema } = require("./bookings.model");

function setupModels(sequelize) {
  Booking.init(BookingSchema, Booking.config(sequelize));
}

module.exports = setupModels;
