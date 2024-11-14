const { Sequelize } = require('sequelize');

const db = new Sequelize('u231283718_AtelierIA', 'u231283718_dorianbarres', 'Cecco22440', {
  host: '193.203.168.99',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    port: 3306,
    acquire: 30000,
    idle: 10000
  }
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;