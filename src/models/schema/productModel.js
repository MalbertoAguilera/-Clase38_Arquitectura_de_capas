const mongoose = require("mongoose");
const { mongodb } = require("../config");

const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const productModel = mongoose.model(mongodb.collectionProduct, ProductoSchema);

module.exports = productModel;
