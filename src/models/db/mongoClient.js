const mongoose = require("mongoose");
const config = require("../config");

class MyMongoClient {
  constructor() {
    this.conected = false;
    this.client = mongoose;
  }

  async connect() {
    try {
      await this.client.connect(config.mongodb.cnxStr, config.mongodb.options);
      this.conected = true;
      console.log("Conectado a MongoDB");
    } catch (error) {
      console.log("error a conectar a mongoDB");
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      this.conected = false;
      console.log("desconectado de MongoDB");
    } catch (error) {
      console.log("error al desconectar a mongoDB");
    }
  }
}

module.exports = MyMongoClient;
