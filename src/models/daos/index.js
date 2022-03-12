let productosDao;
let carritosDao;


switch (process.env.PERSISTENCIA || "mongodb") {
  // case 'firebase':
  //     const ProductosDaoFirebase= await require('./productos/ProductosDaoFirebase.js')
  //     const CarritosDaoFirebase = await require('./carritos/CarritosDaoFirebase.js')

  //     productosDao = new ProductosDaoFirebase()
  //     carritosDao = new CarritosDaoFirebase()
  //     break
  case "mongodb":
    const ProductosDaoMongoDb = require("../containers/product/ContenedorMongoDb");
    const MessageDaoMongoDb = require('../containers/message/ContenedorMongoDb')

    ProductosDao = ProductosDaoMongoDb;
    MessagesDao = MessageDaoMongoDb;
    break;
}

module.exports = { ProductosDao, MessagesDao };
