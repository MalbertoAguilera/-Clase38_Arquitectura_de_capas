const MyMongoClient = require('../../db/mongoClient');
const ProductDao = require('../../daos/product/ProductDao');
const {asPOJO,removeField,renameField} = require('../../../utils/objectUtils');
const productModel = require('../../schema/productModel');

class ContenedorMongoDb extends ProductDao  {
    constructor() {
        super();
        this.client = new MyMongoClient();
        this.client.connect();
        this.coleccion = productModel;
    }

    async getById(id) {
        try {
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            if (docs.length == 0) {
                throw new Error('Error al listar por id: no encontrado')
            } else {
                const result = renameField(asPOJO(docs[0]), '_id', 'id')
                return result
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async getAll() {
        try {
            let docs = await this.coleccion.find({}, { __v: 0 }).lean()
            docs = docs.map(asPOJO)
            docs = docs.map(d => renameField(d, '_id', 'id'))
            return docs
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async add(nuevoElem) {
        try {
            let doc = await this.coleccion.create(nuevoElem);
            doc = asPOJO(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async updateById(idParaReemplazar, nuevoProd) {
        let result;
        try {
          result = await this.coleccion.findOneAndReplace(
            { _id: idParaReemplazar },
            nuevoProd,
            { __v: 0 },
          );
        } catch (error) {
          throw new Error(`error al reemplazar al producto---- ${error}`);
        }
    
        if (!result) {
          throw new Error(`no se encontró para actualizar un producto con id: ${idParaReemplazar}`);
        }
    
        return nuevoProd;
      }

    async deleteById(id) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id })
            if (n == 0 || nDeleted == 0) {
                throw new Error('Error al borrar: no encontrado')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    exit() {
        this.client.disconnect();
      }

        // async actualizar(nuevoElem) {
    //     try {
    //         renameField(nuevoElem, 'id', '_id')
    //         const { n, nModified } = await this.coleccion.replaceOne({ '_id': nuevoElem._id }, nuevoElem)
    //         if (n == 0 || nModified == 0) {
    //             throw new Error('Error al actualizar: no encontrado')
    //         } else {
    //             renameField(nuevoElem, '_id', 'id')
    //             removeField(nuevoElem, '__v')
    //             return asPOJO(nuevoElem)
    //         }
    //     } catch (error) {
    //         throw new Error(`Error al actualizar: ${error}`)
    //     }
    // }
}

module.exports = ContenedorMongoDb;