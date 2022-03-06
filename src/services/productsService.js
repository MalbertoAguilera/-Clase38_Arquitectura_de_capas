const ProductsDao = require("../models/daos/productsDao");
//la capa de servicios no se fija que base de datos esta utilizando para ejecutar la consulta
//De eso se encarga el DAOS, se comunica con la capa de persistencia
class ProductsApi {
  constructor() {
    this.productsDao = new ProductsDao();
  }

  async agregar(product) {
    let newProduct = await this.productsDao.add(product);
    return newProduct;
  }
  async buscar(id) {
        let products;
        if (id) {
              products=await this.productsDao.getById(id);
        } else {
              products=await this.productsDao.getAll();
        }
        return products;
  }
  async borrar(id) {
        let products;
        if (id) {
              products=await this.productsDao.deleteById(id);
        } else {
              products=await this.productsDao.deleteAll();
        }
        return products;
  }
}
