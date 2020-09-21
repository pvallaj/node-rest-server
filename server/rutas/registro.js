const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

const Usuario = require('../modelos/usuario');
const bc = require('bcrypt');

app.post('/registro', function(req, resp) {

    let datos = req.body;

    console.log(`${datos.email} --- ${datos.password}`);

    Usuario.findOne({ email: datos.email }, (err, usuarioDB) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return resp.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrecto'
                }
            });
        }

        if (!bc.compareSync(datos.password, usuarioDB.password)) {
            return resp.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrecto*'
                }
            });
        }

        let token = jwt.sign({
            data: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        resp.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    });


});

module.exports = app;