const { RESTDataSource } = require('apollo-datasource-rest');

class AqiApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.airvisual.com/v2';
  }

  async getCity(country, state, city) {
    const result = await this.get(`/city?city=${city}&state=${state}&country=${country}&key=${process.env.AIR_VISUAL_API_KEY}`);
    return {
      city,
      state,
      country,
      coordinates: result.data.location.coordinates,
      // forecasts: result.data.forecasts,
      current: result.data.current,
      // history: result.data.history,
    };
  }

  async getClosestCity() {
    const { city, region, country, ip_address } = await this.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}`);
    const result = await this.get(`/nearest_city?key=${process.env.AIR_VISUAL_API_KEY}`, undefined, {
      headers: {
        'X-Forwarded-For': ip_address,
      },
    });
    return {
      city,
      state: region,
      country: country === 'United States' ? 'USA' : country,
      coordinates: result.data.location.coordinates,
      // forecasts: result.data.forecasts,
      current: result.data.current,
      // history: result.data.history,
    };
  }

  async getCities(country, state) {
    const result = await this.get(`/cities?state=${state}&country=${country}&key=${process.env.AIR_VISUAL_API_KEY}`);
    return result.data.map(({ city }) => {
      return {
        city,
        state,
        country,
      };
    });
  }

  async getStates(country) {
    const result = await this.get(`/states?country=${country}&key=${process.env.AIR_VISUAL_API_KEY}`);
    return result.data.map(({ state }) => {
      return {
        state,
        country,
      };
    });
  }

  async getCountries() {
    const result = await this.get(`/countries?key=${process.env.AIR_VISUAL_API_KEY}`);
    return result.data;
  }
}

module.exports = AqiApi;