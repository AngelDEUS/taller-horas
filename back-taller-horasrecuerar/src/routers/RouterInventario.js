/* 
    Rutas del Inventario del taller ********
*/
const express = require('express');
const {
    GETALL_STOCKS,
    GET_PRODUCTOS_INVENTARIO,
    CREATE_INVENTARIO,
    UPDATE_INVENTARIO,
    DELETE_INVENTARIO
} = require('../controllers/InventarioMain_c')

const rutasInventario = express.Router();

// INVENTARIO
rutasInventario.get("/getinventario_p", GET_PRODUCTOS_INVENTARIO);
rutasInventario.get("/getallstocks", GETALL_STOCKS);
rutasInventario.post("/inventariocreate", CREATE_INVENTARIO);
rutasInventario.put("/inventarioup/:id", UPDATE_INVENTARIO);
rutasInventario.delete("/inventariodel/:id", DELETE_INVENTARIO);

module.exports = rutasInventario;