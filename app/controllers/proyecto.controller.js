const db = require("../config/db.config.js");
const Proyecto = db.Proyecto;

exports.create = (req, res) => {
  let proyecto = {};

  try {
    proyecto.nombre = req.body.nombre;
    proyecto.descripcion = req.body.descripcion;
    proyecto.fecha_creacion = new Date();

    Proyecto.create(proyecto).then((result) => {
      res.status(200).json({
        message: `Proyecto creado exitosamente con id = ${result.id}`,
        proyecto: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el proyecto!",
      error: error.message,
    });
  }
};

exports.retrieveAllProyectos = (req, res) => {
  Proyecto.findAll()
    .then((proyectos) => {
      res.status(200).json({
        message: "Proyectos recuperados exitosamente!",
        proyectos: proyectos,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al obtener proyectos!",
        error: error.message,
      });
    });
};

exports.getProyectoById = (req, res) => {
  let id = req.params.id;
  Proyecto.findByPk(id)
    .then((proyecto) => {
      if (proyecto) {
        res.status(200).json({
          message: `Proyecto recuperado con id = ${id}`,
          proyecto: proyecto,
        });
      } else {
        res.status(404).json({
          message: `No se encontró el proyecto con id = ${id}`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al obtener el proyecto!",
        error: error.message,
      });
    });
};

exports.updateById = async (req, res) => {
  try {
    let id = req.params.id;
    let proyecto = await Proyecto.findByPk(id);

    if (!proyecto) {
      res.status(404).json({
        message: `No se pudo actualizar el proyecto con id = ${id}`,
        error: "404",
      });
    } else {
      let updatedObject = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
      };

      let result = await Proyecto.update(updatedObject, { returning: true, where: { id: id } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No se pudo actualizar el proyecto!",
        });
      }

      res.status(200).json({
        message: `Proyecto actualizado con éxito, id = ${id}`,
        proyecto: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error al actualizar el proyecto con id = ${id}`,
      error: error.message,
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    let id = req.params.id;
    let proyecto = await Proyecto.findByPk(id);

    if (!proyecto) {
      res.status(404).json({
        message: `No existe el proyecto con id = ${id}`,
        error: "404",
      });
    } else {
      await proyecto.destroy();
      res.status(200).json({
        message: `Proyecto eliminado con éxito, id = ${id}`,
        proyecto: proyecto,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error al eliminar el proyecto con id = ${id}`,
      error: error.message,
    });
  }
};
