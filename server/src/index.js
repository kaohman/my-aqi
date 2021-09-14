const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const AqiApi = require('./datasources/aqi-api');
const UserApi = require('./datasources/user-api');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const store = createStore();

const dataSources = () => ({
  aqiApi: new AqiApi(),
  userApi: new UserApi({ store }),
});

const context = async ({ req }) => {
  const auth = (req.headers && req.headers.authorization) || '';
  const email = Buffer.from(auth, 'base64').toString('ascii');

  if (!isEmail.validate(email)) return { user: null };

  const users = await store.users.findOrCreate({ where: { email } });
  const user = users && users[0] || null;

  return { user };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  introspection: true,
  apollo: {
    key: process.env.APOLLO_KEY,
  },
});
  
server.listen({ port: process.env.PORT || 4000 }).then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});