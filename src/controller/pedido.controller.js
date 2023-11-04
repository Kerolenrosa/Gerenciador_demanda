
const pedidoService = require('../service/pedido.service')

const inserir = async (req, res) => {
    const {cliente, data_pedido, ambiente, data_entrega, status, projetista, observacao } = req.body;

    if (!cliente || !data_pedido || !ambiente || !data_entrega || !projetista ){
        res.status(400).send({mensagem: "Preencha todos os campos "});
    }
    
    const pedidoCriado = await pedidoService.criarPedido (req.body);

    if (!pedidoCriado) {
        return res.status(400).send({mensagem: "Erro ao criar pedido"})
    }

    res.status(201).send({
        pedido: {
            cliente,
            data_pedido,
            ambiente,
            data_entrega,
            projetista,
            status,
            observacao,
            id: pedidoCriado._id
        },
        mensagem: "Pedido criado com sucesso",
    });
}

const buscarPedidobyCliente = async (req, res) => {
    const cliente = req.body.cliente
    const encontrouPedido = await pedidoService.buscarPedidobyCliente(cliente);

    if (!encontrouPedido){
        return res.status(400).send({mensagem: "Pedido não encontrado"});
    }

    return res.status(200).json(encontrouPedido);
}

const buscarPedidobyStatus = async (req, res) => {
    const status = req.body.status
    const encontrouPedido = await pedidoService.buscarPedidobyStatus(status);

    if (!encontrouPedido){
        return res.status(400).send({mensagem: "Pedido não encontrado"});
    }

    return res.status(200).json(encontrouPedido);
}

const atualizarPedido = async (req, res) => {
    const {cliente, data_pedido, ambiente, data_entrega, status, projetista, observacao } = req.body;

    if (!cliente && !data_pedido && !ambiente && !data_entrega && !projetista &&!status && !observacao){
        res.status(400).send({mensagem: "Preencha pelo menos um campo para atualizar"});
    } 

    const cliente_parametro = req.params.cliente;
    const cliente_atualizado = await pedidoService.buscarPedidobyCliente(cliente_parametro);

    if (!cliente_atualizado){
        res.status(400).send({mensagem: "Nenhum pedido encontrado com esse cliente"});
    }

    const atualizado = await pedidoService.atualizarPedido(
        cliente, 
        data_pedido, 
        ambiente, 
        data_entrega, 
        status, 
        projetista, 
        observacao
    );

    res.send({mensagem: "Pedido atualizado com sucesso"});
}

const deletarPedido = async (req, res) => {
    const {cliente} = req.body;

    if (!cliente){
        res.status(400).send({mensagem: "Preencha o nome do cliente"});
    } 

    const clienteEncontrado = await pedidoService.buscarPedidobyCliente(cliente);

    if (!clienteEncontrado){
        res.status(400).send({mensagem: "Nenhum pedido encontrado com esse cliente"});
    }

    const clienteDeletado = await pedidoService.deletarPedido(cliente);

    res.send({mensagem: "Pedido excluído com sucesso"});
}

const buscarTodos = async(req,res) => {
    let { page , size = 10, projetista, data_pedido } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const skip = (page - 1) * size;
    const query = {};
    if (projetista) query.projetista = projetista;
    if (data_pedido) {
        query.data_pedido = {
            $gte: new Date(data_pedido),
            $lt: new Date(new Date(data_pedido).setDate(new Date(data_pedido).getDate() + 1))
        };
    }

    try {
        const [results, totalCount] = await Promise.all([
            pedidoService.buscarTodosPaginado(query,skip, size),
            pedidoService.buscarTodosTotal(query)
        ]);

        if (totalCount === 0) return res.status(204).end()

        res.json({
            data: results,
            currentPage: page,
            pageSize: size,
            totalPages: Math.ceil(totalCount / size),
            totalItems: totalCount
        });
    } catch (err) {
        res.status(502).json({ message: "Serviço Indisponível" });
    };
}

module.exports = { inserir, buscarPedidobyCliente, buscarPedidobyStatus, atualizarPedido, deletarPedido, buscarTodos};