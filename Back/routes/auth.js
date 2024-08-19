const express = require('express');
const Router = express.Router();
const controller = require('../controller/controller');
const authMiddleware = require('../middlewares/auth');

Router.post('/register', controller.register);
Router.post('/login', controller.login);

Router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
});

Router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Acceso permitido', user: req.user });
});

module.exports = Router;
