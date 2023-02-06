const services = require("../services");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const criar = async (req, res) => {
  try {
    const { email, senha, confirmarsenha } = req.body;

    if (!email || !senha || !confirmarsenha) {
      return res.status(400).send({
        msg: "Prencha todos os campos para cadastrar",
      });
    }

    if (senha !== confirmarsenha) {
      return res.status(422).json({ msg: "As senhas nao conferem!" });
    }

    const usuario = await services
      .criarUsuario(req.body)
      .catch((err) => console.log(err.message));

    if (!usuario) {
      return res.status(400).send({
        msg: "Erro ao criar usuário",
      });
    }

    res.status(201).send({
      msg: "Usuário criado com sucesso",
      usuario: {
        id: usuario.id,
        email,
      },
    });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const listar = async (req, res) => {
  try {
    const usuarios = await services.listarUsuarios();

    if (usuarios.length === 0) {
      return res.status(400).send({
        msg: "Não há usuários cadastrados!",
      });
    }

    res.send(usuarios);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const selecionar = async (req, res) => {
  try {
    const usuario = req.usuario;
    res.send(usuario);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await services.logar(email);

    if (!usuario) {
      return res.status(404).send({ msg: "Usuário não encontrado!" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(404).send({ msg: "Usuário não encontrado!" });
    }

    const token = services.gerarToken(usuario.id);

    res.send({ token });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = { criar, listar, selecionar, login };
