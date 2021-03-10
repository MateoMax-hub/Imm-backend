// Importación de módulos de versiones anteriores
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

// crear el servidor
const app = express();



// Conectar a mongodb
mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@clusterimm.5b9in.mongodb.net/test`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);


// app uses 
app.use(express.json({ extended: true }));

// importe de rutas 
app.use('/api/usuarios', require('./routes/usuarios'))


// puerto y arranque del servidor
app.listen(4000, () => {
  console.log("Servidor Funcionando");
});
