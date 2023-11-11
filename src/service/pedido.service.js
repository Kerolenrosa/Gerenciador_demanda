const Pedido = require("../model/Pedido");

const criarPedido = (body) => Pedido.create(body);

const buscarPedidobyCliente = (cliente) => Pedido.findOne({ cliente: cliente })

const buscarPedidobyStatus = (status) => Pedido.findOne({ status: status })

const atualizarPedido = (
    cliente,
    data_pedido,
    ambiente,
    data_entrega,
    status,
    projetista,
    observacao
) => Pedido.findOneAndUpdate(
    { cliente: cliente },
    { cliente, data_pedido, ambiente, data_entrega, status, projetista, observacao }
)

const deletarPedido = (id) => Pedido.deleteOne({ _id: id })

const buscarTodosPaginado = (query, skip, size) => Pedido.find(query).skip(skip).limit(size)

const buscarTodosTotal = (query) => Pedido.countDocuments(query)

module.exports = {
    criarPedido,
    buscarPedidobyCliente,
    buscarPedidobyStatus,
    atualizarPedido, 
    deletarPedido,
    buscarTodosTotal,
    buscarTodosPaginado
};