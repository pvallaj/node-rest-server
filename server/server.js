require('./config/config');

const mongoose = require('mongoose');

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(require('./rutas/usuario'));


mongoose.connect(process.env.conDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, resp) => {
    if (err) throw err;

    console.log('Base de datos LISTA');
});

app.listen(process.env.PORT);

console.log('Escuchando el puerto ' + process.env.PORT);