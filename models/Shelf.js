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
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    movies_watched: {
        type: DataTypes.BOOLEAN,
        references: {
            model: 'movie',
            key: 'watched'
        }
    },
    movies_on_deck: {
        type: DataTypes.BOOLEAN,
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

module.exports = Shelf;