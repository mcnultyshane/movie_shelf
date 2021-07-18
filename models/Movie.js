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
    type: DataTypes.STRING(1000),
  },

  poster_path: {
    type: DataTypes.STRING,
  },

  genre_id: {
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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
  },
  watched: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  on_deck: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

  
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'movie',
});

module.exports = Movie;