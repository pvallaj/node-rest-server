const express = require('express');
const app = express();


app.get('/', function(req, resp) {
    //resp.writeHead(200, { 'Content-Type': 'application/json' });
    let salida = {
        nombre: 'Paulino',
        edad: '42'
    }
    resp.send(JSON.stringify(salida));
});

app.listen(3000);

console.log('Escuchando el puerto 3000');