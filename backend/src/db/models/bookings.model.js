const { Model, DataTypes } = require("sequelize");

const BOOKINGS_TABLE = "bookings";

class Booking extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: BOOKINGS_TABLE,
      modelName: "Booking",
      timestamps: true,
    };
  }
}

const BookingSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: "status",
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "description",
  },
};

module.exports = { Booking, BookingSchema };
