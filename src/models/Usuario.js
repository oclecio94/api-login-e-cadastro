const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  registrado: {
    type: Date,
    default: Date.now(),
  },
});

UsuarioSchema.pre("save", async function (next) {
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

const Usuario = mongoose.model("Usuarios", UsuarioSchema);

module.exports = Usuario;
