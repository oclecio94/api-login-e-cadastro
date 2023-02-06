const express = require("express");
const conectarBanco = require("./database");
const cors = require("cors");
const route = require("./routes");
require("dotenv").config();

const port = process.env.PORT || 3333;
const app = express();

conectarBanco();

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}!`));
