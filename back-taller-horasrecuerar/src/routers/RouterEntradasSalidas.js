/* 
    Rutas de las Entradas y Salidas del taller ********
*/

const express = require('express');
const {
    GETALL_ENTRADAS,
    CREATE_ENTRADA,
    GETALL_SALIDAS,
    CREATE_SALIDA
} = require('../controllers/EntradasSalidas_c')

const router = express.Router();

// Rutas para entradas
router.get('/entradas', GETALL_ENTRADAS);
router.post('/entrada', CREATE_ENTRADA);

// Rutas para salidas
router.get('/salidas', GETALL_SALIDAS);
router.post('/salida', CREATE_SALIDA);

module.exports = router;
