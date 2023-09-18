const Usuario = require("../model/Usuario");

const criarUsuario = (body) => Usuario.create(body);

const buscarTodosUsuarios = () => Usuario.find();

module.exports = {
    criarUsuario,
    buscarTodosUsuarios,
};