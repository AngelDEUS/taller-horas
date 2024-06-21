/* Index principal */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const RouterManin = require('./routers/RouterMain')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Cors Configuraion --
const optionsCors = {
    origin: `http://localhost:3000`,
    methods: 'GET, POST, PUT, DELETE',
    optionSuccessStatus: 200,
}

// ----> Uses
app.use(cors(optionsCors));

// Modulo de Usuarios
app.use('/productos', RouterManin)

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));

// ---- Puertos Listen
app.listen(PORT, ()=>{
  console.log(`\n\n     El servidor funcionando en el puerto: \x1b[33m[${PORT}]\x1b[33m.`);
  console.log(`\n     Local:                  http://localhost:${PORT}\x1b[0m\n`);
})