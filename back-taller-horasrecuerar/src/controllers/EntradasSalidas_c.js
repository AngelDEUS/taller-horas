const db = require('../model/ModelTaller').promise();

// Consultar todas las entradas de productos
const GETALL_ENTRADAS = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo todas las entradas de productos...");
        const [result] = await db.query(`
            SELECT e.id_entrada, e.fecha, e.hora, e.cantidad_entrada, p.id_producto, p.nombre_producto
            FROM entrada_productos e
            JOIN productos p ON e.id_producto = p.id_producto
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener las entradas de productos. \x1b[0m\n' });
    }
};

// Registrar una nueva entrada de producto
const CREATE_ENTRADA = async (req, res) => {
    try {
        const { id_producto, cantidad_entrada, fecha, hora } = req.body;
        await db.query("INSERT INTO entrada_productos (id_producto, cantidad_entrada, fecha, hora) VALUES (?, ?, ?, ?)", [id_producto, cantidad_entrada, fecha, hora]);
        res.status(201).json({ message: 'Entrada de producto registrada exitosamente' });
    } catch (error) {
        console.log(`\n\x1b[31m  Error: ${error} \x1b[0m\n`);
        res.status(500).json({ error: '---> Error al registrar la entrada de producto.' });
    }
};

// Consultar todas las salidas de productos
const GETALL_SALIDAS = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo todas las salidas de productos...");
        const [result] = await db.query(`
            SELECT s.id_salida, s.fecha, s.hora, s.cantidad_salida, s.descripcion, p.id_producto, p.nombre_producto
            FROM salida s
            JOIN productos p ON s.id_producto = p.id_producto
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener las salidas de productos. \x1b[0m\n' });
    }
};

// Registrar una nueva salida de producto y actualizar el inventario
const CREATE_SALIDA = async (req, res) => {
    try {
        const { id_producto, cantidad_salida, fecha, hora, descripcion } = req.body;

        // Registrar la salida del producto
        await db.query("INSERT INTO salida (id_producto, cantidad_salida, fecha, hora, descripcion) VALUES (?, ?, ?, ?, ?)", [id_producto, cantidad_salida, fecha, hora, descripcion]);

        // Actualizar el inventario
        const [currentStock] = await db.query("SELECT cantidad FROM inventario WHERE id_producto = ?", [id_producto]);
        if (currentStock.length > 0) {
            const newStock = currentStock[0].cantidad - cantidad_salida;
            if (newStock >= 0) {
                await db.query("UPDATE inventario SET cantidad = ? WHERE id_producto = ?", [newStock, id_producto]);
                console.log(`\x1B[32m\n-----> Salida de producto registrada y stock de ID PRODUCTO:(${id_producto}), actualizado exitosamente ...\x1B[39m`);
                res.status(201).json({ message: 'Salida de producto registrada y stock actualizado exitosamente' });
            } else {
                res.status(400).json({ error: 'Stock insuficiente para la salida del producto.' });
            }
        } else {
            res.status(404).json({ error: 'Producto no encontrado en el inventario.' });
        }
    } catch (error) {
        console.log(`\n\x1b[31m  Error: ${error} \x1b[0m\n`);
        res.status(500).json({ error: '---> Error al registrar la salida de producto o actualizar el inventario.' });
    }
};

module.exports = {
    GETALL_ENTRADAS,
    CREATE_ENTRADA,
    GETALL_SALIDAS,
    CREATE_SALIDA
};
