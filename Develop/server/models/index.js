const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const userTypeDefs = require('./typeDefs');
const userResolvers = require('./resolvers');
const bookTypeDefs = require('./typeDefs');
const bookResolvers = require('./Book');

// Merge type definitions from different files
const typeDefs = mergeTypeDefs([userTypeDefs, bookTypeDefs]);

// Merge resolver functions from different files
const resolvers = mergeResolvers([userResolvers, bookResolvers]);

module.exports = {
  typeDefs,
  resolvers,
};