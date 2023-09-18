const route = require('express').Router();
const usuarioController = require('../controller/usuario.controller');

route.post('/', usuarioController.inserir)

route.get('/', usuarioController.buscarTodosUsuarios)

module.exports = route;