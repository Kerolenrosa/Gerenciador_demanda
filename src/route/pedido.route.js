const route = require('express').Router();
const pedidoController = require('../controller/pedido.controller');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

route.post('/',  upload.single('file'), pedidoController.inserir)

route.get('/', pedidoController.buscarPedidobyCliente)

route.get('/status', pedidoController.buscarPedidobyStatus)

route.put('/:cliente', pedidoController.atualizarPedido)

route.delete('/:id', pedidoController.deletarPedido)

route.get('/todos', pedidoController.buscarTodos)

module.exports = route;