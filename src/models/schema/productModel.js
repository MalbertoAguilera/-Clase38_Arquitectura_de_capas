const mongoose = require("mongoose");
const { mongodb } = require("../config");

const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

const productModel = mongoose.model(mongodb.collectionProduct, ProductoSchema);

module.exports = productModel;
