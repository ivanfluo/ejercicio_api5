const db = require("../config/db.config.js");
const Usuario = db.Usuario;

exports.create = (req, res) => {
  let usuario = {};

  try {
    usuario.nombre = req.body.nombre;
    usuario.correo = req.body.correo;
    usuario.contrasenia = req.body.contrasenia;
    usuario.fecha_creacion = new Date();

    Usuario.create(usuario).then((result) => {
      res.status(200).json({
        message: `Usuario creado exitosamente con id = ${result.id}`,
        usuario: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el usuario!",
      error: error.message,
    });
  }
};

exports.retrieveAllUsuarios = (req, res) => {
  Usuario.findAll()
    .then((usuarios) => {
      res.status(200).json({
        message: "Usuarios recuperados exitosamente!",
        usuarios: usuarios,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al obtener usuarios!",
        error: error.message,
      });
    });
};

exports.getUsuarioById = (req, res) => {
  let id = req.params.id;
  Usuario.findByPk(id)
    .then((usuario) => {
      if (usuario) {
        res.status(200).json({
          message: `Usuario recuperado con id = ${id}`,
          usuario: usuario,
        });
      } else {
        res.status(404).json({
          message: `No se encontró el usuario con id = ${id}`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al obtener el usuario!",
        error: error.message,
      });
    });
};

exports.updateById = async (req, res) => {
  try {
    let id = req.params.id;
    let usuario = await Usuario.findByPk(id);

    if (!usuario) {
      res.status(404).json({
        message: `No se pudo actualizar el usuario con id = ${id}`,
        error: "404",
      });
    } else {
      let updatedObject = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasenia: req.body.contrasenia,
      };

      let result = await Usuario.update(updatedObject, { returning: true, where: { id: id } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No se pudo actualizar el usuario!",
        });
      }

      res.status(200).json({
        message: `Usuario actualizado con éxito, id = ${id}`,
        usuario: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error al actualizar el usuario con id = ${id}`,
      error: error.message,
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    let id = req.params.id;
    let usuario = await Usuario.findByPk(id);

    if (!usuario) {
      res.status(404).json({
        message: `No existe el usuario con id = ${id}`,
        error: "404",
      });
    } else {
      await usuario.destroy();
      res.status(200).json({
        message: `Usuario eliminado con éxito, id = ${id}`,
        usuario: usuario,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error al eliminar el usuario con id = ${id}`,
      error: error.message,
    });
  }
};
