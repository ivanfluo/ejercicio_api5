const db = require("../config/db.config.js");
const Tarea = db.Tarea;

exports.create = (req, res) => {
  let tarea = {};

  try {
    tarea.nombre = req.body.nombre;
    tarea.estado = req.body.estado;
    tarea.fecha_creacion = new Date();
    tarea.fecha_vencimiento = req.body.fecha_vencimiento;

    Tarea.create(tarea).then((result) => {
      res.status(200).json({
        message: `Tarea creada exitosamente con id = ${result.id}`,
        tarea: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la tarea!",
      error: error.message,
    });
  }
};

exports.retrieveAllTareas = (req, res) => {
  Tarea.findAll()
    .then((tareas) => {
      res.status(200).json({
        message: "Tareas recuperadas exitosamente!",
        tareas: tareas,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al obtener tareas!",
        error: error.message,
      });
    });
};

exports.getTareaById = (req, res) => {
  let id = req.params.id;
  Tarea.findByPk(id)
    .then((tarea) => {
      if (tarea) {
        res.status(200).json({
          message: `Tarea recuperada con id = ${id}`,
          tarea: tarea,
        });
      } else {
        res.status(404).json({
          message: `No se encontró la tarea con id = ${id}`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al obtener la tarea!",
        error: error.message,
      });
    });
};

exports.updateById = async (req, res) => {
  try {
    let id = req.params.id;
    let tarea = await Tarea.findByPk(id);

    if (!tarea) {
      res.status(404).json({
        message: `No se pudo actualizar la tarea con id = ${id}`,
        error: "404",
      });
    } else {
      let updatedObject = {
        nombre: req.body.nombre,
        estado: req.body.estado,
        fecha_vencimiento: req.body.fecha_vencimiento,
      };

      let result = await Tarea.update(updatedObject, { returning: true, where: { id: id } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No se pudo actualizar la tarea!",
        });
      }

      res.status(200).json({
        message: `Tarea actualizada con éxito, id = ${id}`,
        tarea: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error al actualizar la tarea con id = ${id}`,
      error: error.message,
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    let id = req.params.id;
    let tarea = await Tarea.findByPk(id);

    if (!tarea) {
      res.status(404).json({
        message: `No existe la tarea con id = ${id}`,
        error: "404",
      });
    } else {
      await tarea.destroy();
      res.status(200).json({
        message: `Tarea eliminada con éxito, id = ${id}`,
        tarea: tarea,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error al eliminar la tarea con id = ${id}`,
      error: error.message,
    });
  }
};
