const {
    Model,
    DataTypes
} = require('sequelize/types');
const sequelize = require('../config/connection');

class Genre extends Model {}

Genre.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    genre_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'movie',
            key: 'genreID'
        },
    title :{
        type: DataTypes.STRING,
        
    }

    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'genre',
});

module.exports = Genre;