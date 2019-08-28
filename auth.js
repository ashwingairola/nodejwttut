const jwt = require('jsonwebtoken');

const getToken = (user, callback) => {
    jwt.sign({ user }, 'goluzsecret', {expiresIn: '1d'}, callback);
};

const protectRoute = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];

        jwt.verify(bearerToken, 'goluzsecret', (err, _authData) => {
            if (err) {
                res.status(403).json({
                    message: 'Forbidden'
                });
            }
            next();
        });
    } else {
        res.status(403).json({
            message: 'Forbidden'
        });
    }
};

module.exports = {
    getToken,
    protectRoute
};
