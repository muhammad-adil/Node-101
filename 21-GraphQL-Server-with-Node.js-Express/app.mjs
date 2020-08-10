import express from "express";
const app = express();
const port = 3000;
import schema, { graphql } from "./schema";

var { buildSchema } = require("graphql");
var schema = buildSchema(`
  type Product {
    name: String,
    id: Int
  },
  type Query {
    hello: String,
    products: [Product]
  }
`);

const getProducts = () => {
    return Promise.resolve([{
      title: 'Movie'
    }]);
  }  
  
  var root = {
    hello: () => {
      return "Hello world!";
    },
    products: () => {
      return getProducts();
    }
  };

var graphqlHTTP = require("express-graphql");
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);


app.get("/", (req, res) => {
  let query = `{ hello, person { name }, people { name, description } }`;
  graphql(schema, query).then(result => {
    res.json(result);
  });
});
app.listen(port, () => console.log(`Example app listening on port port!`));