let express = require("express");
let router = express.Router();

const departamento = require("../controllers/departamento.controller.js");

const usuarioController = require("../controllers/usuario.controller.js");
const proyectoController = require("../controllers/proyecto.controller.js");
const tareaController = require("../controllers/tarea.controller.js");

router.post("/departamento/create", departamento.create);
router.get("/departamento/all", departamento.retrieveAllDepartamento);
router.get("/departamento/onebyid/:id", departamento.getDepartamentoById);
router.put("/departamento/update/:id", departamento.updateById);
router.delete("/departamento/delete/:id", departamento.deleteById);

router.post("/usuarios/create", usuarioController.create);
router.get("/usuarios", usuarioController.retrieveAllUsuarios);
router.get("/usuarios/:id", usuarioController.getUsuarioById);
router.put("/usuarios/:id", usuarioController.updateById);
router.delete("/usuarios/:id", usuarioController.deleteById);

router.post("/proyectos/create", proyectoController.create);
router.get("/proyectos", proyectoController.retrieveAllProyectos);
router.get("/proyectos/:id", proyectoController.getProyectoById);
router.put("/proyectos/:id", proyectoController.updateById);
router.delete("/proyectos/:id", proyectoController.deleteById);

router.post("/tareas/create", tareaController.create);
router.get("/tareas", tareaController.retrieveAllTareas);
router.get("/tareas/:id", tareaController.getTareaById);
router.put("/tareas/:id", tareaController.updateById);
router.delete("/tareas/:id", tareaController.deleteById);

module.exports = router;
