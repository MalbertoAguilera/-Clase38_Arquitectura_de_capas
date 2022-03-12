const ProductsService= require("../../services/productsService");
const productosApi = new ProductsService();

const addProductsHandler = async (socket, io) => {
  socket.emit("server_sendProducts", await productosApi.buscar());

  socket.on("client_newProduct", async (item) => {
    await productosApi.agregar(item);
    io.emit("server_sendProducts", await productosApi.buscar());
  });
};

module.exports = addProductsHandler;
