const { models } = require("../libs/sequelize");

class BookingsService {
  constructor() {}

  async find() {
    const res = await models.Booking.findAll();
    return res;
  }

  async create(data) {
    const res = await models.Booking.create(data);
    return res;
  }

  async update(id, data) {
    const model = await models.Booking.findByPk(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await models.Booking.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}

module.exports = BookingsService;
