const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

require('./configuration/data_source');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true,  
}));


app.listen(3000, ()=>{
 console.log('server listening on port 3000');
});