const ProductsService = require("../../services/productsService");
const productosApi = new ProductsService();

const rootGraphQL = {
  products: async () => {
    return await productosApi.buscar();
  },
  addProduct: async ({input}) => {
        console.log(input);
        const newProduct = await productosApi.agregar(input);
        return newProduct
  },
  deleteProduct: async({id}) =>{
      return await productosApi.borrar(id);
  }
};

module.exports = rootGraphQL;
