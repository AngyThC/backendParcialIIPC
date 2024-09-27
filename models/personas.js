'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class personas extends Model {
    static associate(models) {
   
    }
  }

  personas.init({
    idPersona: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
    },
    profesion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    universidad: {
      type: DataTypes.STRING(100),
    },
    carrera: {
      type: DataTypes.STRING(100),
    },
    trabajo: {
      type: DataTypes.STRING(100),
    },
    vehiculo: {
        type: DataTypes.STRING(100),
    },
    estado: {
     type: DataTypes.STRING(100),
    }
  }, {
    sequelize,
    modelName: 'personas',
    timestamps: false 
  });

  return personas;
};
