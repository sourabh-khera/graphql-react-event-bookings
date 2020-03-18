const userResolver = require('../resolvers/user');
const eventResolver = require('../resolvers/event');

const rootResolver = {
  ...userResolver,
  ...eventResolver
}

module.exports = rootResolver;