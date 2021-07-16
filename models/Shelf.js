// const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const {
    Model,
    DataTypes
} = require('sequelize');

class Shelf extends Model {}

Shelf.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    movies_watched: {
        references: {
            model: 'movie',
            key: 'watched'
        }
    },
    movies_on_deck: {
        references: {
            model: 'movie',
            key: 'on_deck'
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'shelf',
});

module.exports = User;