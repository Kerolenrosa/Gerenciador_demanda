const route = require('express').Router();
const pedidoController = require('../controller/pedido.controller');
const multer = require('multer');

const upload = multer({});

route.post('/',  upload.single('fileToUpload'), pedidoController.inserir)

route.get('/:id', pedidoController.buscarPedidobyId)

route.get('/:id/pdf', pedidoController.buscarPdf)

route.get('/status', pedidoController.buscarPedidobyStatus)

route.put('/:id', pedidoController.atualizarPedido)

route.delete('/:id', pedidoController.deletarPedido)

route.get('', pedidoController.buscarTodos)

module.exports = route;