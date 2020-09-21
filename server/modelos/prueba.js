const mongoose = require('mongoose');
const uv = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let pruebaSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    id: {
        type: Number,
    },
    guid: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    balance: {
        type: Number,
    },
    age: {
        type: Number,
    },
});


module.exports = mongoose.model('Prueba', pruebaSchema);