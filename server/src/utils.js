const { Sequelize } = require('sequelize');

module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: './store.sqlite'
  });

  const users = db.define('user', {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    email: Sequelize.STRING,
    token: Sequelize.STRING,
  });

  const favoriteCities = db.define('favoriteCity', {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    userId: Sequelize.INTEGER,
    country: Sequelize.STRING,
    state: Sequelize.STRING,
    city: Sequelize.STRING,
  });

  return { db, users, favoriteCities };
};