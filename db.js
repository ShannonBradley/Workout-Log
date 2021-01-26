const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-log', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(function () {
    console.log('Connection has been established successfully');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;