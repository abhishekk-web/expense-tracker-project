const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const order = sequelize.define('order', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true  
    },
    paymentid: Sequelize.STRING,
    orderid: Sequelize.STRING,
    status: Sequelize.STRING

})

module.exports = order;