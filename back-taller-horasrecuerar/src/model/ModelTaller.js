/* Modelo del taller, conexion a la base de datos */


const mysql  =require('mysql2');
const myDatabaseName = 'inventario_taller_db';

// Mi conexión de la base de datos.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: myDatabaseName,
})

db.connect((err) =>{
    if (err) {
        console.error('\n\x1b[31m',"Errorr al conectar en la base de datos ",myDatabaseName,'.\n\n', err, '\x1b[0m\n');
        return        
    }
    console.log(`\x1b[36m     Conexion Existosa a la base de datos "${myDatabaseName}".`, '\x1b[0m\n');
})

process.on("SIGINT", ()=> {
    db.end();
    process.exit();
})

module.exports = db;