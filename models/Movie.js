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
<<<<<<< HEAD
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  },

=======
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
  },
>>>>>>> 4709e1b4e7a759569024721dd25443daabb0f551
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