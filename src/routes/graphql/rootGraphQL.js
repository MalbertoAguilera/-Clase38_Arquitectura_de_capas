const ProductsService = require("../../services/productsService");
const productosApi = new ProductsService();

const rootGraphQL = {
      products: async () => {
            return await productosApi.buscar();
      }
}

module.exports = rootGraphQL;