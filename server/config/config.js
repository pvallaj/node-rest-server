//------------------------------------
//Puerto
//------------------------------------
//desarrollador01-Zq0JAy7kvnc2Hu2Z
//conexion a mongoDBAtlas
//mongodb+srv://<username>:<password>@cluster0.mvo2d.mongodb.net/test
//mongodb+srv://desarrollador01:Zq0JAy7kvnc2Hu2Z@cluster0.mvo2d.mongodb.net/test
process.env.PORT = process.env.PORT || 3000;


//para verificar el entorno
let urlDB;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if (process.env.NODE_ENV === 'dev') {
    console.log('BASE DE DATOS LOCAL');
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    console.log('atlas Mongo DB');
    urlDB = 'mongodb+srv://desarrollador01:Zq0JAy7kvnc2Hu2Z@cluster0.mvo2d.mongodb.net/test';
}

process.env.conDB = urlDB;