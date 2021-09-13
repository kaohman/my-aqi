const resolvers = {
  Query: {
    city: (_, { country, state, city }, { dataSources }) => {
      return dataSources.aqiApi.getCity(country, state, city);
    },
    closestCity: (_, __, { dataSources }) => {
      return dataSources.aqiApi.getClosestCity();
    },
    cities: (_, { country, state }, { dataSources }) => {
      return dataSources.aqiApi.getCities(country, state);
    },
    states: (_, { country }, { dataSources }) => {
      return dataSources.aqiApi.getStates(country);
    },
    countries: (_, __, { dataSources }) => {
      return dataSources.aqiApi.getCountries();
    },
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userApi.findOrCreateUser({ email });
      if (user) {
        user.token = Buffer.from(email).toString('base64');
        return user;
      }
    },
  }
};

module.exports = resolvers;
