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
    const ProductosDaoMongoDb = await require("../containers/ContenedorMongoDb");
    // const CarritosDaoMongoDb = await require('./carritos/CarritosDaoMongoDb.js')

    productosDao = new ProductosDaoMongoDb();
    // carritosDao = new CarritosDaoMongoDb()
    break;
}

export { productosDao, carritosDao };
