const mysql = require('mysql2')

const dotenv = require('dotenv');
dotenv.config();

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

conexion.connect( (error)=> {
    if(error){
        console.log('Error de conexión= ' + error)
        return
    }
    console.log('Conexion establecida correctamente')
})

module.exports = conexion
