const Usuario = require("../model/Usuario");

const criarUsuario = (body) => Usuario.create(body);

const buscarTodosUsuarios = () => Usuario.find();

const buscarUsuario = (body) => Usuario.findOne({usuario: body.usuario, senha: body.senha })

module.exports = {
    criarUsuario,
    buscarTodosUsuarios,
    buscarUsuario,
};