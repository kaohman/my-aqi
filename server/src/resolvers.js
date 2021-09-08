const resolvers = {
  Query: {
    city: (_, { country, state, city }, { dataSources }) => {
      return dataSources.aqiApi.getCity(country, state, city);
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
};

module.exports = resolvers;
