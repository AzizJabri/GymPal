const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs');

const generateToken = (user) => {
    const token = jwt.sign(user, JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
};

const verifyToken = (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
};

module.exports = {
    generateToken,
    verifyToken,
}