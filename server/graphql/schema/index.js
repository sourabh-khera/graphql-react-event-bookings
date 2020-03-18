const { buildSchema } = require('graphql');


module.exports = buildSchema(
  `
    type Event {
      _id: ID!,
      title: String!,
      price: Float!,
      description: String!,
      date: String!, 
    }
    
    type User {
      email: String!,
      password: String, 
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

    input UserInput {
      email: String!,
      password: String!
    }

    type RootMutation { 
      createEvent(eventInput: EventInput): Event

      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery,
      mutation: RootMutation
    }   
  `
);