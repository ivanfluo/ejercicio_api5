module.exports = (sequelize, Sequelize) => {
  const Departamento = sequelize.define("departamento", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,  
      primaryKey: true,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
  });

  return Departamento;
};
