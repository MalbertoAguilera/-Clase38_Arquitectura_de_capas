const { buildSchema } = require("graphql");

const schemaGraphql = buildSchema(`
      type Product{
            id:ID,
            title:String,
            price:Float,
            stock:Int,
            thumbnail:String
      }

      input productInput{
            title:String!,
            price:Float!,
            stock:Int!,
            thumbnail:String!
      }

      type Query{
            products:[Product]
      }

      type Mutation {
            addProduct(input: productInput!): Product
            deleteProduct(id:ID):String
      }
`);

module.exports = schemaGraphql;
