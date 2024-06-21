/* Controlador rincial del taller */
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
        JOIN inventario i ON p.id_producto = i.id_producto
        GROUP BY i.cantidad DESC;
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener mayor Stock en el dashboard. \x1b[0m\n' });
    }
}

module.exports = {
    GETALL_FULL_STOCK,
    GET_DASHBOARD_TOP_STOCK
}