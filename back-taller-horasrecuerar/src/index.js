/* Index principal */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`     \nEl servidor esta corriendo en: ${PORT}.\n`);
});