const Prueba = require('../modelos/prueba');

const express = require('express');
const app = express();
const bc = require('bcrypt');
const _ = require('underscore');

app.get('/prueba', function(req, resp) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    console.log(`Haciendo solicitud a prueba ... ${desde} ${limite}`);
    Prueba.find({}, "name email id guid balance age")
        .limit(limite)
        .skip(desde)
        .exec((err, encontrados) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(encontrados.length);
            Prueba.countDocuments({}, (err, conteo) => {
                resp.json({
                    ok: true,
                    encontrados,
                    numreg: conteo
                });
            });
        })
});

app.post('/prueba', function(req, resp) {
    let b = req.body;

    let prb = new Prueba({
        name: 'Prueba A',
        email: 'AAAA',
        id: 1,
        guid: 'AAAA',
        isActive: true,
        balance: 100,
        age: 100
    });

    prb.save((err, regDB) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null; No aplica porque se elimina este campo al regresarlo. 

        resp.json({
            ok: true,
            usuario: regDB
        });
    });

});

module.exports = app;