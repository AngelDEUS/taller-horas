/* Controlador rincial del taller */
const db = require('../model/ModelTaller').promise();

const GETALL_PRODUCTOS = async (req, res) => {
    try {
        console.log("\n-----> Obteniendo datos de los Productos...");
        const [result] = await db.query(`
        SELECT * FROM productos;
        `);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: '\n\x1b[31m  ---> Error al obtener los productos. \x1b[0m\n' });
    }
}



module.exports = {
    GETALL_PRODUCTOS
}