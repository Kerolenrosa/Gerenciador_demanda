const route = require('express').Router();
const pedidoController = require('../controller/pedido.controller');

route.post('/', pedidoController.inserir)

route.get('/:id', pedidoController.buscarPedidobyId)

route.get('/status', pedidoController.buscarPedidobyStatus)

route.put('/:id', pedidoController.atualizarPedido)

route.delete('/:id', pedidoController.deletarPedido)

route.get('/todos', pedidoController.buscarTodos)

module.exports = route;