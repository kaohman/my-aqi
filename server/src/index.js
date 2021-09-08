const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const AqiApi = require('./datasources/aqi-api');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      aqiApi: new AqiApi(),
    };
  },
});
  
server.listen({ port: process.env.PORT || 4000 }).then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});