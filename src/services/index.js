const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

const criarUsuario = (body) => Usuario.create(body);

const listarUsuarios = () => Usuario.find();

const selecionarID = (id) => Usuario.findById(id);

const logar = (email) => Usuario.findOne({ email: email }).select("+senha");

const gerarToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET, { expiresIn: 86400 });

module.exports = {
  criarUsuario,
  listarUsuarios,
  selecionarID,
  logar,
  gerarToken,
};
