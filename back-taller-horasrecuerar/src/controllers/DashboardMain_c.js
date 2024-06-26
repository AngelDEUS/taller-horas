/*
    Controlador rincial del taller *****
*/

const db = require('../model/ModelTaller').promise();

// DASHBOARD
const GETALL_FULL_STOCK = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo datos de los Stock en el dashboard...");
        const [result] = await db.query(`
        SELECT SUM(cantidad) AS "Stocks_Existentes" FROM inventario;
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener los Stock en el dashboard. \x1b[0m\n' });
    }
}

// DASHBOARD - LISTA
const GET_DASHBOARD_TOP_STOCK = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo datos del mayor Stock en el dashboard...");
        const [result] = await db.query(`
        SELECT p.id_producto, p.nombre_producto, p.tipo_producto, p.peso_neto, p.detalle_peso_neto, p.precio, i.cantidad AS "Stock_Existente"
        FROM productos p
        JOIN (
            SELECT id_producto, MAX(cantidad) AS cantidad
            FROM inventario
            GROUP BY id_producto
        ) i ON p.id_producto = i.id_producto
        ORDER BY i.cantidad DESC
        LIMIT 5;
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener mayor Stock en el dashboard. \x1b[0m\n' });
    }
}

// 
const GET_PRODUCTOS_REGISTRADOS = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo datos los productos registrados en el dashboard...");
        const [result] = await db.query(`
            SELECT count(*) AS "Productos_Registrados" FROM productos;
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener los productos registrados en el dashboard. \x1b[0m\n' });
    }
}


// Total de stock de productos
const GET_TOTAL_STOCK = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo el total de stock de productos en el dashboard...");
        const [result] = await db.query(`
            SELECT SUM(cantidad) AS "Stocks_Existentes" FROM inventario;
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener el total de stock de productos en el dashboard. \x1b[0m\n' });
    }
}

// Total de productos con stock bajo
const GET_STOCK_BAJO = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo el total de productos con stock bajo en el dashboard...");
        const [result] = await db.query(`
            SELECT count(*) AS "Productos_Stock_Bajo"  FROM inventario
            WHERE cantidad < 15;
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener el total de productos con stock bajo en el dashboard. \x1b[0m\n' });
    }
}

// Total de productos sin stock
const GET_STOCK_SIN_STOCK = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo el total de productos sin stock en el dashboard...");
        const [result] = await db.query(`
            SELECT count(*) AS "Productos_Sin_Stock"  FROM inventario
            WHERE cantidad = 0;
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener el total de productos sin stock en el dashboard. \x1b[0m\n' });
    }
}

module.exports = {
    GETALL_FULL_STOCK,
    GET_DASHBOARD_TOP_STOCK,
    GET_PRODUCTOS_REGISTRADOS,
    GET_TOTAL_STOCK,
    GET_STOCK_BAJO,
    GET_STOCK_SIN_STOCK
}