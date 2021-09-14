const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class UserApi extends DataSource {
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
    // get user's favorite cities and use AQI api to get current info for each of those cities
    const userId = this.context.user.id;
    const favorites = await this.store.favoriteCities.findAll({ where: { userId } });
    console.log(favorites)
    return favorites;
  }

  async addFavoriteCity(country, state, city) {
    const userId = this.context.user.id;

    const favoriteCities = await this.store.favoriteCities.findAll({ where: { userId } });
    if (favoriteCities.length >= 3) return { success: false, content: 'User cannot have more than 3 favorite cities' };

    const res = await this.store.favoriteCities.findOrCreate({
      where: { userId, country, state, city },
    });
    return res && res.length
      ? { success: true, content: res[0].get() }
      : { success: false, content: '' };
  }

  async removeFavoriteCity(id) {
    const userId = this.context.user.id;
    return !!this.store.favoriteCities.destroy({ where: { userId, id }});
  }
}

module.exports = UserApi;