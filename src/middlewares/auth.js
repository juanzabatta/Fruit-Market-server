// Tokens
const jwt = require('jsonwebtoken');

// Verify token
const verifyAuth = (req, res, next) => {
    const token = req.get('token');

    jwt.verify(token, 'FM-2020-Prod', (err, decoded) => {

        if (err) {
            return res.status(401).json({
                message: 'Usuario no válido'
            })
        } else {
            req.user = decoded.data;

            next();
        }


    });

}

// Verify role
const verifyDirective = (req, res, next) => {
    const role = req.user.role

    if (role === 'DIRECTIVE') {
        next();
    } else {
        return res.status(401).json({
            message: 'Usuario no válido'
        })
    }
}

module.exports = { verifyAuth, verifyDirective }