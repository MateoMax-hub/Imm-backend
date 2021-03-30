//Importación de módulos de versiones anteriores
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();

//Crear el servidor
const app = express();

//Conectar a mongodb
mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@clusterimm.5b9in.mongodb.net/test`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
//Settings
app.set('port', process.env.PORT || 4000)
app.use(cors())

//Middlewares
app.use(express.json({ limit: '50mb', extended: true }));
app.use(morgan('dev'))
app.use(express.json({ extended: true }));
app.use(express.urlencoded())

//Importe de rutas 
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/pedidos', require('./routes/pedidos'))
app.use('/api/packs', require('./routes/packs'))

//Puerto y arranque del servidor
app.listen(app.get('port'), () => {
  console.log("Servidor Funcionando");
});
