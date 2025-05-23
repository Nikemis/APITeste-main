import jwt from 'jsonwebtoken'

const isLoggedIn = (req, res, next) => {
    const token = req.headers['id-token'];

    if (!token) return res.status(401).json({
        auth: false, message: 'Token nao fornecido'
    });

    jwt.verify(token, 'segredo', function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Falha !' });
        next();
    });
}

export { isLoggedIn }