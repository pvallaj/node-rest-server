const Usuario = require('../modelos/usuario');

const express = require('express');
const app = express();

app.get('/usuario', function(req, resp) {
    resp.json('GET Usuario');
});

app.post('/usuario', function(req, resp) {
    let b = req.body;

    let usr = new Usuario({
        nombre: b.nombre,
        email: b.email,
        password: b.password,
        role: b.role
    });

    usr.save((err, usuarioDB) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                err
            });
        }
        resp.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', function(req, resp) {
    let id = req.params.id
    resp.json({ id });
});

app.delete('/usuario', function(req, resp) {
    let b = req.body;
    resp.json({ b, accion: 'DELETE' });
});

module.exports = app;