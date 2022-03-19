const { buildSchema } = require("graphql");

const schemaGraphql = buildSchema(`
      type Producto{
            id:ID,
            title:String,
            price:Float,
            stock:Int,
            thumbnail:String
      }

      type Query{
            products:[Producto]
            hello:String

      }
`);

module.exports = schemaGraphql;
