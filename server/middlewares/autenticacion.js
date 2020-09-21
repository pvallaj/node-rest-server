//===============================================
// verificaci'on del token
//===============================================

const jwt = require('jsonwebtoken');

let verificaToken = (req, resp, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return resp.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.data;
        next();
    });


}

//===============================================
// verifica el rol de ADMIN 
//===============================================
let verificaAdmin = (req, resp, next) => {
    let token = req.get('token');

    if (req.usuario.role === 'ADMIN') {
        next();
    } else {
        return resp.status(401).json({
            ok: false,
            err: {
                message: 'Se requieren privilegios de administrador'
            }
        });
    }



}


module.exports = {
    verificaToken,
    verificaAdmin
}