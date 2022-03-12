const CustomError = require("../../error/CustomError");
class MessageDao {
  async getAll() {
    throw new CustomError(500, "falta implementar getAll!");
  }

  async getById(id) {
    throw new CustomError(500, "falta implementar getById!");
  }

  async add(prodNuevo) {
    throw new CustomError(500, "falta implementar add!");
  }

  async deleteById(id) {
    throw new CustomError(500, "falta implementar deleteById!");
  }

  async deleteAll() {
    throw new CustomError(500, "falta implementar deleteAll!");
  }

  async updateById(id, nuevoProd) {
    throw new CustomError(500, "falta implementar updateById!");
  }
}

module.exports = MessageDao;
