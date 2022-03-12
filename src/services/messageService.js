const {MessagesDao} = require('../models/daos/index');

class MessagesApi {
  constructor () {
    this.messagesDao = new MessagesDao();
  }

  async agregar(msgParaAgregar) {
    const msgAgregado = await this.messagesDao.add(msgParaAgregar);
    return msgAgregado;
  }

  async buscar(id) {
    let message;
    if (id) {
      message = await this.messagesDao.getById(id);
    } else {
      message = await this.messagesDao.getAll();
    }
    return message;
  }

  async borrar(id) {
    if (id) {
      await this.messagesDao.deleteById(id);
    } else {
      await this.messagesDao.deleteAll();
    }
  }

  async reemplazar(id, msgParaReemplazar) {
    const msgReemplazado = await this.messagesDao.updateById(
      id,
      msgParaReemplazar
    );
    return msgReemplazado;
  }

  exit() {
    this.messagesDao.exit();
  }
}

module.exports = MessagesApi;
