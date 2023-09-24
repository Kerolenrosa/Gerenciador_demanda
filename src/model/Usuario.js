const mongoose = require('mongoose')


const UsuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    }
});

const Usuario = mongoose.model("usuario", UsuarioSchema);

module.exports = Usuario;