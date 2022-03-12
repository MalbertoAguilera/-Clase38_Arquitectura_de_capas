const mongoose = require("mongoose");
const { mongodb } = require("../config");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: {
    email: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    avatar: { type: String, required: true },
    alias: { type: String, required: true }
  },  
  text: { type: String, required: true },
  date: { type: String, required: true},
});

const messageModel = mongoose.model(mongodb.collectionMessages, MessageSchema);

module.exports = messageModel;
