const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const conectarBanco = async () => {
  await mongoose
    .connect(
      `mongodb+srv://${dbUser}:${dbPass}@cluster0.hogkgix.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("MongoDB conectado!"))
    .catch((err) =>
      console.log(`Erro ao se conectar com o banco de dados: ${err}`)
    );
};

module.exports = conectarBanco;
