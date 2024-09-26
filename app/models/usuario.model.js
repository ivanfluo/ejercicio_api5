module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      correo: {
        type: Sequelize.STRING,
        unique: true,
      },
      contrasenia: {
        type: Sequelize.STRING,
      },
      fecha_creacion: {
        type: Sequelize.DATE,
      },
    });
  
    return Usuario;
  };
  