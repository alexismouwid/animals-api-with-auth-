const express = require("express");
const mongoose = require("mongoose");
const Animal = require("./animal.controller");
const app = express();
const port = 3000;
const { Auth, isAuthenticated } = require("./auth.controller");

const uri = "mongodb://localhost:27017/miBaseDeDatos";

mongoose.connect(uri)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

app.use(express.json());

app.get("/animals", isAuthenticated, Animal.list);
app.post("/animals", isAuthenticated, Animal.create);
app.put("/animals/:id", isAuthenticated, Animal.update);
app.patch("/animals/:id", isAuthenticated, Animal.update);
app.delete("/animals/:id", isAuthenticated, Animal.destroy);

app.post("/login", Auth.login);
app.post("/register", Auth.register);

app.use(express.static("app"));

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(`${__dirname}/index.html`);
});

app.get("*", (req, res) => {
  res.status(404).send("Esta pagina no existe :()");
});

app.listen(port, () => {
  console.log("Arrancando la aplicación");
});
