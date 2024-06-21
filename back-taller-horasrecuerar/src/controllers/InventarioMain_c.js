/* 
    Controlador princial del INVENTARIO taller ******
*/
const db = require('../model/ModelTaller').promise();

// Obtener todos los stocks de productos
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
};

// Obtener inventario de productos
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
        console.log(`n\x1b[31m  ---> Error: ${error}\x1b[0m\n`);
        res.status(500).json({ error: '\n--->  Error al obtener los Productos en el Inventario. \n' });
    }
};

// Crear una nueva entrada en el inventario
const CREATE_INVENTARIO = async (req, res) => {
    try {
        const { id_producto, cantidad } = req.body;
        await db.query("INSERT INTO inventario (id_producto, cantidad) VALUES (?, ?)", [id_producto, cantidad]);
        console.log(`\x1B[32m\n-----> Inventario con Producto de ID:(${id_producto}), creado exitosamente ...\x1B[39m`);
        res.status(201).json({ message: 'Inventario creado exitosamente' });
    } catch (error) {
        console.log(`\n\x1b[31m  Error: ${error} \x1b[0m\n`);
        res.status(500).json({ error: '---> Error al crear el inventario.' });
    }
};

// Actualizar una entrada del inventario
const UPDATE_INVENTARIO = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        await db.query("UPDATE inventario SET cantidad = ? WHERE id_inventario = ?", [cantidad, id]);
        console.log(`\x1B[33m\n-----> Inventario con ID:(${id}), Actualizado exitosamente ...\x1B[39m`);
        res.status(200).json({ message: 'Inventario actualizado exitosamente' });
    } catch (error) {
        console.log(`\n\x1b[31m  Error: ${error} \x1b[0m\n`);
        res.status(500).json({ error: '---> Error al actualizar el inventario.' });
    }
};

// Eliminar una entrada del inventario
const DELETE_INVENTARIO = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM inventario WHERE id_inventario = ?", [id]);
        console.log(`\x1B[35m\n-----> Inventario con ID:(${id}), Eliminado exitosamente ...\x1B[39m`);
        res.status(200).json({ message: 'Inventario eliminado exitosamente' });
    } catch (error) {
        console.log(`\n\x1b[31m  Error: ${error} \x1b[0m\n`);
        res.status(500).json({ error: '---> Error al eliminar el inventario.' });
    }
};

module.exports = {
    GETALL_STOCKS,
    GET_PRODUCTOS_INVENTARIO,
    CREATE_INVENTARIO,
    UPDATE_INVENTARIO,
    DELETE_INVENTARIO
};
