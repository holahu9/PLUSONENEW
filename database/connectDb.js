const Sequelize = require('sequelize');
require('dotenv').config();
// create instance sequelize connect
const sequelize = new Sequelize( process.env.DATABASE, 
    process.env.DATABASE_USER, 
    process.env.DATABASE_PASSWORD, 
    {
   host: process.env.DATABASE_HOST,
   port:process.env.DATABASE_PORT,
   dialect: 'mysql',
   dialectOptions: {connectTimeout: 1000}, // mariadb connector option
   timezone: '+07:00',
   freezeTableName: true
   //logging: false // Log Sql excuting
 })
 sequelize
 .authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
 .catch(err => {
   console.error('Unable to connect to the database:', err);
 });
 module.exports = sequelize ;