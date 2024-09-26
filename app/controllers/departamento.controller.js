const db = require('../config/db.config.js');
const Departamento = db.Departamento;

exports.create = (req, res) => {
  let departamento = {};

  try {
    departamento.id = req.body.id;
    departamento.descripcion = req.body.descripcion;

    Departamento.create(departamento).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.id}`,
        departamento: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllDepartamento = (req, res) => {
  Departamento.findAll()
    .then(departamentoInfo => {
      res.status(200).json({
        message: "Departamentos recuperados exitosamente!",
        departamentos: departamentoInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener departamentos!",
        error: error.message
      });
    });
};

exports.getDepartamentoById = (req, res) => {
  let departamento = req.params.id;
  Departamento.findByPk(id)
    .then(departamento => {
      if (departamento) {
        res.status(200).json({
          message: `Departamento obtenido con id = ${id}`,
          departamento: departamento
        });
      } else {
        res.status(404).json({
          message: `No se encontró el departamento con id = ${id}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el departamento",
        error: error.message
      });
    });
};

exports.updateById = async (req, res) => {
  try {
    let id = req.params.id;
    let departamento = await Departamento.findByPk(id);

    if (!departamento) {
      res.status(404).json({
        message: `No fue posible actualizar la canción con id = ${id}`,
        departamento: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        libro_id: req.body.libro_id,
        usuario_id: req.body.usuario_id,
        fecha_salida: req.body.fecha_salida,
        fecha_maxima: req.body.fecha_maxima,
        fecha_devolucion: req.body.fecha_devolucion
      };
      let result = await Departamento.update(updatedObject, { returning: true, where: { id: id } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el departamento con id = " + req.params.id,
          error: "Can NOT Updated"
        });
      }

      res.status(200).json({
        message: `Departamento actualizado con éxito, id = ${id}`,
        departamento: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el departamento con id = " + req.params.id,
      error: error.message
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    let id = req.params.id;
    let departamento = await Departamento.findByPk(id);

    if (!departamento) {
      res.status(404).json({
        message: `No existe la canción con id = ${id}`,
        error: "404"
      });
    } else {
      await departamento.destroy();
      res.status(200).json({
        message: `Canción eliminada con éxito, id = ${id}`,
        departamento: departamento
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar una canción con id = " + req.params.id,
      error: error.message
    });
  }
};                  