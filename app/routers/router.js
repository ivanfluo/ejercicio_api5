let express = require("express");
let router = express.Router();

const departamento = require("../controllers/departamento.controller.js");

router.post("/departamento/create", departamento.create);
router.get("/departamento/all", departamento.retrieveAllDepartamento);
router.get("/departamento/onebyid/:id", departamento.getDepartamentoById);
router.put("/departamento/update/:id", departamento.updateById);
router.delete("/departamento/delete/:id", departamento.deleteById);

module.exports = router;
