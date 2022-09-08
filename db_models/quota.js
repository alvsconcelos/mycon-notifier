
const Sequelize = require('sequelize')
const { DataTypes } = require("sequelize")
const database = require('../db')
 
const Quota = database.define('quota', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
})
 
module.exports = Quota