const sequelize = require('../config/connection');

Movie.init(
    {
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
      }

    },
    {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'movie',
        }
    );

    module.exports = User;