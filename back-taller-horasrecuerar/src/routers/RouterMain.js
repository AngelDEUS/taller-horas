/* 
    Router principal del taller ********
*/

const express = require('express');
// const rutaController = require('../controllers/ControllerMain')
const rutaControllerDashboard = require('../controllers/DashboardMain_c')
const {
    GETALL_PRODUCTOS,
    GET_PRODUCTO_BY_ID,
    GET_PRODUCTO_BY_NAME,
    CREATE_PRODUCTO,
    UPDATE_PRODUCTO,
    DELETE_PRODUCTO
} = require('../controllers/ControllerMain');

const rutasComplete = express.Router();

// PRODUCTOS
// rutasComplete.get("/getall", rutaController.GETALL_PRODUCTOS);

rutasComplete.get('/productogetall', GETALL_PRODUCTOS);
rutasComplete.get('/producto/:id', GET_PRODUCTO_BY_ID);
rutasComplete.get('/productosearch', GET_PRODUCTO_BY_NAME);
rutasComplete.post('/productocreate', CREATE_PRODUCTO);
rutasComplete.put('productoup/:id', UPDATE_PRODUCTO);
rutasComplete.delete('productodel/:id', DELETE_PRODUCTO);

// DASHBOARD
rutasComplete.get("/dashboardstock", rutaControllerDashboard.GETALL_FULL_STOCK);
rutasComplete.get("/dashboardmayorstock", rutaControllerDashboard.GET_DASHBOARD_TOP_STOCK);
rutasComplete.get("/dashboard1", rutaControllerDashboard.GET_PRODUCTOS_REGISTRADOS);
rutasComplete.get("/dashboard2", rutaControllerDashboard.GET_TOTAL_STOCK);
rutasComplete.get("/dashboard3", rutaControllerDashboard.GET_STOCK_BAJO);
rutasComplete.get("/dashboard4", rutaControllerDashboard.GET_STOCK_SIN_STOCK);



module.exports = rutasComplete;