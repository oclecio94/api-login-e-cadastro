const mongoose = require("mongoose");
const services = require("../services");

const validarId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ msg: "ID inválido!" });
  }
  next();
};

const validarUsuario = async (req, res, next) => {
  const id = req.params.id;

  const usuario = await services.selecionarID(id);

  if (!usuario) {
    return res.status(400).send({
      msg: "Usuário nao encontrado!",
    });
  }

  req.id = id;
  req.usuario = usuario;

  next();
};

module.exports = { validarId, validarUsuario };
