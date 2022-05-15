const Sequelize = require('sequelize');

const db = require('../config/database');


const todo = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
})

module.exports = todo;