const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    process.env.database_name,
    process.env.database_user,
    process.env.database_pass,
    {
        dialect: 'mysql',
        host: process.env.database_host,
        port: process.env.database_port
    });