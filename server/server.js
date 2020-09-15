require('./config/config');

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.get('/usuario', function(req, resp) {
    resp.json('GET Usuario');
});

app.post('/usuario', function(req, resp) {
    let b = req.body;
    if (b.nombre === undefined) {
        resp.status(400).json({
            ok: false,
            mensaje: 'Se requiere de un nombre'
        });
    } else {
        resp.json({ b, accion: 'POST' });
    }
});

app.put('/usuario/:id', function(req, resp) {
    let id = req.params.id
    resp.json({ id });
});

app.delete('/usuario', function(req, resp) {
    let b = req.body;
    resp.json({ b, accion: 'DELETE' });
});

app.listen(process.env.PORT);

console.log('Escuchando el puerto ' + process.env.PORT);