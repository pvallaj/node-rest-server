const Usuario = require('../modelos/usuario');

const express = require('express');
const app = express();
const bc = require('bcrypt');
const _ = require('underscore');

app.get('/usuario', function(req, resp) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    console.log(`Haceindo solicitud ... ${desde} ${limite}`);
    Usuario.find(null, 'nombre email role estado google img')
        .skip(desde) // se salta los registros
        .limit(limite) //limite de registros
        .exec((err, encontrados) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments(null, (err, conteo) => {
                resp.json({
                    ok: true,
                    encontrados,
                    numreg: conteo
                });
            });
        })
});

app.post('/usuario', function(req, resp) {
    let b = req.body;

    let usr = new Usuario({
        nombre: b.nombre,
        email: b.email,
        password: bc.hashSync(b.password, 10),
        role: b.role
    });

    usr.save((err, usuarioDB) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null; No aplica porque se elimina este campo al regresarlo. 

        resp.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', function(req, resp) {
    let id = req.params.id
    let b = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, b, { new: true, runValidators: true }, (err, udb) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                err
            });
        }

        resp.json({
            ok: true,
            usuario: udb
        });
    });


    //resp.json({ id });

});

app.delete('/usuario/:id', function(req, resp) {
    let id = req.params.id;

    let cambio = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambio, { new: true }, (err, udb) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                err
            });
        }

        resp.json({
            ok: true,
            usuario: udb
        });
    });
});

module.exports = app;