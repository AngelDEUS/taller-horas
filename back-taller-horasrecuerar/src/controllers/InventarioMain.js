/* Controlador princial del INVENTARIO taller */
const db = require('../model/ModelTaller').promise();

// 
const GETALL_STOCKS = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo datos de los Stock de los Productos...");
        const [result] = await db.query(`
        SELECT p.id_producto, p.nombre_producto, i.cantidad AS "Stock_Existente"
        FROM productos p
        JOIN inventario i ON p.id_producto = i.id_producto
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener los Stock de los Productos. \x1b[0m\n' });
    }
}
// INVENTARIO -- ss
const GET_PRODUCTOS_INVENTARIO = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo datos de los Productos en el Inventario...");
        const [result] = await db.query(`
        SELECT p.id_producto, p.nombre_producto, p.tipo_producto , concat(p.peso_neto, ' ', p.detalle_peso_neto ) AS 'Peso_Producto', p.precio, i.cantidad AS "Stock"
        FROM productos p
        JOIN inventario i ON p.id_producto = i.id_producto;
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener los Productos en del Inventario. \x1b[0m\n' });
    }
}

module.exports = {
    GETALL_STOCKS,
    GET_PRODUCTOS_INVENTARIO
}