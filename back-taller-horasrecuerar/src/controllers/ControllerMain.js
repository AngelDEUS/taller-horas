/*
    Controlador princial del taller *****
*/
const db = require('../model/ModelTaller').promise();

const GETALL_PRODUCTOS = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo datos de los Productos...");
        const [result] = await db.query("SELECT * FROM productos;");
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener los productos. \x1b[0m\n' });
    }
}

const GET_PRODUCTO_BY_ID = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("SELECT * FROM productos WHERE id_producto = ?", [id]);
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener el producto. \x1b[0m\n' });
    }
}

const GET_PRODUCTO_BY_NAME = async (req, res) => {
    try {
        const { name } = req.query;
        const [result] = await db.query("SELECT * FROM productos WHERE nombre_producto LIKE ?", [`%${name}%`]);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener el producto. \x1b[0m\n' });
    }
}

const CREATE_PRODUCTO = async (req, res) => {
    try {
        const { id_producto, nombre_producto, tipo_producto, peso_neto, detalle_peso_neto, precio, id_estado } = req.body;
        await db.query("INSERT INTO productos (id_producto, nombre_producto, tipo_producto, peso_neto, detalle_peso_neto, precio, id_estado) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [id_producto, nombre_producto, tipo_producto, peso_neto, detalle_peso_neto, precio, id_estado]);
        
        console.log(`\x1B[32m\n-----> Producto con ID:(${id_producto}), creado exitosamente ...\x1B[39m`);
        res.status(201).json({ message: `Producto con ID:(${id_producto}), creado exitosamente` });
    } catch (error) {
        console.log(`\n\x1b[31m  Error: ${error} \x1b[0m\n`);
        res.status(500).json({ error: '---> Error al crear el producto. ' });
    }
}

const UPDATE_PRODUCTO = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_producto, tipo_producto, peso_neto, detalle_peso_neto, precio, id_estado } = req.body;
        await db.query("UPDATE productos SET nombre_producto = ?, tipo_producto = ?, peso_neto = ?, detalle_peso_neto = ?, precio = ?, id_estado = ? WHERE id_producto = ?",
            [nombre_producto, tipo_producto, peso_neto, detalle_peso_neto, precio, id_estado, id]);
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al actualizar el producto. \x1b[0m\n' });
    }
}

const DELETE_PRODUCTO = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM productos WHERE id_producto = ?", [id]);
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al eliminar el producto. \x1b[0m\n' });
    }
}

module.exports = {
    GETALL_PRODUCTOS,
    GET_PRODUCTO_BY_ID,
    GET_PRODUCTO_BY_NAME,
    CREATE_PRODUCTO,
    UPDATE_PRODUCTO,
    DELETE_PRODUCTO
}
