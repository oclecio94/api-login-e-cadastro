const router = require("express").Router();
const controllers = require("../controllers");
const { validarId, validarUsuario } = require("../middlewares");

router.post("/cadastrar", controllers.criar);
router.get("/usuario", controllers.listar);
router.get("/usuario/:id", validarId, validarUsuario, controllers.selecionar);
router.post("/login", controllers.login);

module.exports = router;
