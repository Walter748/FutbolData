const bcript = require('bcryptjs');
const conexion = require('../database/db');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'mi_secreto';

exports.register = async(req, res) => {
    try{
        const data = req.body
        console.log(data)
        let passHash = await bcript.hash(data.password, 8)
        conexion.query('INSERT INTO usuarios SET ?', {gmail: data.gmail, usuario:data.usuario, password: passHash}, (error, results)=>{
            if (error) {
                console.log(error);
                res.status(400).json({ message: 'Error al registrar usuario'});
            } else {
                res.status(200).json({ message: 'Usuario registrado exitosamente'});
            }
        })
    } catch (error) {
        console.log(error)
    }       
}

exports.login = async(req, res) => {
    try {
        const data = req.body;
        if (data.gmail && data.password) {
            conexion.query('select * from usuarios where gmail = ?', [data.gmail], async (error , resultado ) =>{
                if (error) {
                    console.error('Error en la consulta a la base de datos:', error);
                    return res.status(500).send('Error interno del servidor');
                }
                if (resultado.length == 0 || !(await bcript.compare(data.password, resultado[0].password))) {
                    res.status(401).json({ message: 'Credenciales incorrectas' });
                } else {
                    const token = jwt.sign({ id: resultado[0].id, gmail: resultado[0].gmail }, secretKey, { expiresIn: '1h' });
                    console.log('Generated Token:', token);  // Verifica que el token se está generando correctamente
                    res.cookie('token', token, { httpOnly: true, secure: false });
                    res.status(200).json({ message: 'Inicio de sesión exitoso', token }); // Incluye el token en la respuesta
                }
            });
        } else {
            res.status(400).json({ message: 'Datos inválidos' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}