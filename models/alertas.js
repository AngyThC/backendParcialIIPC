'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Alertas extends Model {
    static associate(models) {
      // Asociamos alertas con proyectos
      Alertas.belongsTo(models.proyectos, {
        foreignKey: 'idProyecto'
      });
    }
  }

  Alertas.init({
    idAlerta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idProyecto: {
      type: DataTypes.INTEGER,
      references: {
        model: 'proyectos',
        key: 'idProyecto'
      }
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'alertas',
    timestamps: false
  });

  return Alertas;
};
