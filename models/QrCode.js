const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class QrCode extends Model {}

QrCode.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    shelf_url: {
        type: DataTypes.STRING,
    },

    shelf_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'shelf',
          key: 'id'
        }
    }


}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'qrcode',

})

module.exports = QrCode;