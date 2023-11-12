const Pedido = require("../model/Pedido");

const criarPedido = (body) => Pedido.create(body);

const buscarPedidobyId = (id) => Pedido.findOne({ _id: id })

const buscarPedidobyStatus = (status) => Pedido.findOne({ status: status })

const atualizarPedido = (
    id,
    cliente,
    data_pedido,
    ambiente,
    data_entrega,
    status,
    projetista,
    observacao
) => Pedido.findOneAndUpdate(
    { _id: id },
    { cliente, data_pedido, ambiente, data_entrega, status, projetista, observacao }
)

const deletarPedido = (id) => Pedido.deleteOne({ _id: id })

const buscarTodosPaginado = (query, skip, size) =>{
    return Pedido.find(query).skip(skip).limit(size)
} 

const buscarTodosTotal = (query) => Pedido.countDocuments(query)

module.exports = {
    criarPedido,
    buscarPedidobyId,
    buscarPedidobyStatus,
    atualizarPedido, 
    deletarPedido,
    buscarTodosTotal,
    buscarTodosPaginado
};