const route = require('express').Router();
const pedidoController = require('../controller/pedido.controller');

route.post('/', pedidoController.inserir)

route.get('/', pedidoController.buscarPedidobyCliente)

route.get('/status', pedidoController.buscarPedidobyStatus)

route.put('/:cliente', pedidoController.atualizarPedido)

route.delete('/', pedidoController.deletarPedido)

route.get('/todos', pedidoController.buscarTodos)

module.exports = route;