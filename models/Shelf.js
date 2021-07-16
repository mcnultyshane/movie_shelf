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

}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'shelf',
});

module.exports = Shelf;