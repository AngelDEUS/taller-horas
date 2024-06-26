/* Controlador rincial del taller */
const db = require('../model/ModelTaller').promise();

// Total de productos sin stock
const GET_INFORME_ENTRADA = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo el Informe de Entradas en el Inventario...");
        const [result] = await db.query(`
            SELECT ep.id_entrada, concat(ep.fecha, ' - ', ep.hora ) AS "Fecha_Hora_Entrada", p.id_producto, p.nombre_producto,  ep.cantidad_entrada AS "Cantidad"
            FROM entrada_productos ep
            JOIN productos p ON ep.id_producto = p.id_producto
            ORDER BY id_entrada DESC;
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener el Informe de Entradas en el Inventario. \x1b[0m\n' });
    }
}

const GET_INFORME_SALIDA = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo el Informe de Salidas en el Inventario...");
        const [result] = await db.query(`
        SELECT s.id_salida, concat(s.fecha, ' - ', s.hora ) AS "Fecha_Hora_Salida", s.id_producto, p.nombre_producto, s.cantidad_salida, s.descripcion
        FROM salida s
        JOIN productos p ON s.id_producto = p.id_producto
        ORDER BY s.id_salida DESC;
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener el Informe de Salidas en el Inventario. \x1b[0m\n' });
    }
}

module.exports = {
    GET_INFORME_ENTRADA,
    GET_INFORME_SALIDA
}