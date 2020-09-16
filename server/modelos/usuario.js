const mongoose = require('mongoose');
const uv = require('mongoose-unique-validator');

let rolesV = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} NO es un rol valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        requiere: [true, 'el NOMBRE es necesario']
    },
    email: {
        type: String,
        unique: true,
        requiere: [true, 'el CORREO es necesario']
    },
    password: {
        type: String,
        requiere: [true, 'el CORREO es necesario']
    },
    img: {
        type: String,
        requiere: false
    },
    role: {
        type: String,
        default: 'USER',
        enum: rolesV
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uv, { message: '{PATH} no se puede repetir' });
module.exports = mongoose.model('Usuario', usuarioSchema);