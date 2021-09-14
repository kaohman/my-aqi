const resolvers = {
  Query: {
    me: (_, __, { dataSources }) => {
      dataSources.userApi.findOrCreateUser();
    },
    favoriteCities: async (_, __, { dataSources }) => {
      const favoriteCities = await dataSources.userApi.getFavoriteCities();
      return favoriteCities.map(async favorite => {
        const { id, country, state, city } = favorite;
        const details = await dataSources.aqiApi.getCity(country, state, city);
        return { id, ...details };
      });
    },
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
    addFavoriteCity: async (_, { country, state, city }, { dataSources }) => {
      const result = await dataSources.userApi.addFavoriteCity(country, state, city);

      if (!result.success) {
        return {
          success: false,
          message: `Failed to add favorite city. ${result.content}`,
        };
      }
  
      return {
        success: true,
        message: 'Favorite city added',
      };
    },
    removeFavoriteCity: async (_, { id }, { dataSources }) => {
      const result = await dataSources.userApi.removeFavoriteCity(id);

      if (!result) {
        return {
          success: false,
          message: 'Failed to remove favorite city',
        }
      }

      return {
        success: true,
        message: 'Favorite city removed',
      }
    },
  },
};

module.exports = resolvers;
