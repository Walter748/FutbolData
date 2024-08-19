const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'mi_secreto';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token no válido' });
  }
};

module.exports = authMiddleware;
