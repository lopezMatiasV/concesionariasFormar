module.exports = (sequelize, dataTypes) => {
  let alias = "Auto";
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    marca: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    modelo: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    anio: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    color: {
      type: dataTypes.STRING(25),
      allowNull: false,
    },
    imagen: {
      type: dataTypes.STRING(255),
    },
    sucursalId: {
      type: dataTypes.BIGINT(10).UNSIGNED,
    },
  };
  let config = {
    tableName: 'autos',
    timestamps: false
  };
  const Auto = sequelize.define(alias, cols, config);

  Auto.associate = models => {

    Auto.belongsTo(models.Sucursal, {
      as: "sucursal",
      foreignKey: "sucursalId",
    });
    
  };
  return Auto;
};
