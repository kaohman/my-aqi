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

  async findOrCreateUser({ email: emailArg }) {
    const email = this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = await this.store.users.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }

  async getFavoriteCities(country, state) {
    const result = await this.get(`/cities?state=${state}&country=${country}&key=${process.env.AIR_VISUAL_API_KEY}`);
    return result.data.map(({ city }) => {
      return {
        city,
        state,
        country,
      };
    });
  }
}

module.exports = UserApi;