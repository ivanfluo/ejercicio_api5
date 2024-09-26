module.exports = (sequelize, Sequelize) => {
    const Proyecto = sequelize.define("proyecto", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      fecha_creacion: {
        type: Sequelize.DATE,
      },
    });
  
    return Proyecto;
  };
  