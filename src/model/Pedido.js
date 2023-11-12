const mongoose = require('mongoose')


const PedidoSchema = new mongoose.Schema({
    cliente: {
        type: String,
        required: true
    },
    data_pedido: {
        type: Date,
        required: true
    },
    ambiente: {
        type: String,
        required: true
    },
    data_entrega: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: false
    },
    projetista: {
        type: String,
        required: false
    },
    observacao: {
        type: String,
        required: false
    }
});

const Pedido = mongoose.model("pedido", PedidoSchema);

module.exports = Pedido;