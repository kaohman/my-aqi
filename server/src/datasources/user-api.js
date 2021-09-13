const { RESTDataSource } = require('apollo-datasource-rest');
const isEmail = require('isemail');

class UserApi extends RESTDataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateUser({ email: emailArg } = {}) {
    const email = this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = await this.store.users.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }

  async getFavoriteCities() {
    // get user's favorite cities and user AQI api to get current info for each of those cities
    const userId = this.context.user.id;
    const response = await this.store.favoriteCities.find({ where: { userId } });
    console.log(response);
  }

  async addFavoriteCity(country, state, city) {
    const userId = this.context.user.id;
    const response = await this.store.favoriteCities.findOrCreate({
      where: { userId, country, state, city },
    });
    return response && response.length ? res[0].get() : false;
  }

  async removeFavoriteCity(id) {
    const userId = this.context.user.id;
    return !!this.store.favoriteCities.destroy({ where: { userId, id }});
  }
}

module.exports = UserApi;