const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const { buildSchema } = require('graphql');
const cors = require('cors');

const app = express();

const events = [];
app.use(cors());
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
 schema: buildSchema(
  `
    type Event {
      _id: ID!,
      title: String!,
      price: Float!,
      description: String!,
      date: String!, 
    }

    type RootQuery {
      events: [Event!]!
    }
    
    input EventInput {
      title: String!,  
      price: Float!,
      description: String!,
      date: String!, 
    }

    type RootMutation { 
      createEvent(eventInput: EventInput): Event!
    }

    schema {
      query: RootQuery,
      mutation: RootMutation     
    }   
  `
 ),
 rootValue: {
   events: () => {
     return events;
   },
   createEvent: (args) => {
     const event = {
       _id: Math.random(),
       title: args.eventInput.title,
       price: parseFloat(args.eventInput.price),
       description: args.eventInput.description,
       date: args.eventInput.date,
     }
     events.push(event);
     return event;
   }
 },
 graphiql: true,  
}));


app.listen(3000, ()=>{
 console.log('server listening on port 3000');
});