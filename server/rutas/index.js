const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./registro'));

app.use(require('./prueba'));

module.exports = app;