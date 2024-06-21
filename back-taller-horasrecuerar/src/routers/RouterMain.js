/* Router principal del taller */
const express = require('express');
const rutaController = require('../controllers/ControllerMain')
const rutaControllerInventario = require('../controllers/InventarioMain')
const rutaControllerDashboard = require('../controllers/DashboardMain')

const rutasComplete = express.Router();


rutasComplete.get("/getall", rutaController.GETALL_PRODUCTOS);
rutasComplete.get("/getallstocks", rutaControllerInventario.GETALL_STOCKS);

// INVENTARIO
rutasComplete.get("/getinventario_p", rutaControllerInventario.GET_PRODUCTOS_INVENTARIO);

// DASHBOARD
rutasComplete.get("/dashboardstock", rutaControllerDashboard.GETALL_FULL_STOCK);
rutasComplete.get("/dashboardmayorstock", rutaControllerDashboard.GET_DASHBOARD_TOP_STOCK);

module.exports = rutasComplete;