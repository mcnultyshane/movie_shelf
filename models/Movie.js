const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Movie extends Model {}

Movie.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  overview: {
    type: DataTypes.STRING,
  },

  poster_path: {
    type: DataTypes.STRING,
  },

  genreId: {
    type: DataTypes.INTEGER,
  },

  release_date: {
    type: DataTypes.STRING,
  },

  popularity: {
    type: DataTypes.INTEGER,
  },

  shelf_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'shelf',
      key: 'id'
    }
  },
  watched: {
    type: DataTypes.BOOLEAN,
    default: false
  },

  on_deck: {
    type: DataTypes.BOOLEAN,
    default: false
  }

  
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'movie',
});

module.exports = Movie;