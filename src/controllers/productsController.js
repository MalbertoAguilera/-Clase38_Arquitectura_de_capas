const ProductsService = require("../services/productsService");
const productosApi = new ProductsService();

const getProductsController = async (req, res) => {
  const idProduct = req.params.id;
  res.json(await productosApi.buscar(idProduct));
};
const addProductsController = async (req, res) => {
  const newProduct = req.body;
  res.json(await productosApi.agregar(newProduct));
};
const updateProductsController = async (req, res) => {
  const idProduct = req.params.id;
  const newProduct = req.body;
  res.json(await productosApi.reemplazar(idProduct, newProduct));
};
const deleteProductsController = async (req, res) => {
  const idProduct = req.params.id;
  await productosApi.borrar(idProduct);
  res.json({ message: "Producto borrado" });
};

module.exports = {
  getProductsController,
  addProductsController,
  updateProductsController,
  deleteProductsController,
};
