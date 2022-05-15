const jwt = require('jsonwebtoken');
require('dotenv').config()

function roleAuthenticatToken(roles) {
    return function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            console.log(token);
            if (!token) {
                return res.status(403).json({ message: 'User not autorized' });
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) throw new Error('invalid token');
                let hasRole = false;
                const role = user.role;
                if(role === roles){
                    hasRole = true;
                }
                if (!hasRole) {
                    return res.status(403).json({message : 'You dont have an access'});
                }
                next();
            });
        } catch (err) {
            res.status(403).json({ message: 'User not autorized' });
        }
    }
}

module.exports = roleAuthenticatToken;