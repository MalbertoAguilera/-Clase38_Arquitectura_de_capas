let productosDao
let carritosDao

switch (process.env.PERSISTENCIA || 'mongodb') {
    case 'firebase':
        const ProductosDaoFirebase= await import('./productos/ProductosDaoFirebase.js')
        const CarritosDaoFirebase = await import('./carritos/CarritosDaoFirebase.js')

        productosDao = new ProductosDaoFirebase()
        carritosDao = new CarritosDaoFirebase()
        break
    case 'mongodb':
        const ProductosDaoMongoDb  = await import('./productos/ProductosDaoMongoDb.js')
        const CarritosDaoMongoDb = await import('./carritos/CarritosDaoMongoDb.js')

        productosDao = new ProductosDaoMongoDb()
        carritosDao = new CarritosDaoMongoDb()
        break 
}

export { productosDao, carritosDao }