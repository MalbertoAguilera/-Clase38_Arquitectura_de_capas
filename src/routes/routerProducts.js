const express = require("express");
const { Router } = express;
const router = new Router();
const {
  getProductsController,
  addProductsController,
  updateProductsController,
  deleteProductsController,
} = require("../controllers/productsController");

router.get("/get", getProductsController);
router.get("/get/:id", getProductsController);
router.post("/add", addProductsController);
router.delete("/delete/:id", deleteProductsController);
router.put("/update/:id", updateProductsController);

module.exports = router;
