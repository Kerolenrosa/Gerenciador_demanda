
const { enviarEmail } = require('../service/email.service');
const pedidoService = require('../service/pedido.service')

const inserir = async (req, res) => {
 
    const {cliente, data_pedido, ambiente, data_entrega, status, projetista, observacao, cliente_email } = req.body;

    if (!cliente || !data_pedido || !ambiente || !data_entrega || !projetista ){
        res.status(400).send({mensagem: "Preencha todos os campos "});
    }
    
    const pedidoCriado = await pedidoService.criarPedido (req.body);

    if (!pedidoCriado) {
        return res.status(400).send({mensagem: "Erro ao criar pedido"})
    }

    enviarEmail(cliente_email, cliente, ambiente)

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

const buscarPedidobyId = async (req, res) => {
    const id = req.params.id
    const encontrouPedido = await pedidoService.buscarPedidobyId(id);

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

    const cliente_id = req.params.id;
    const cliente_atualizado = await pedidoService.buscarPedidobyId(cliente_id);

    if (!cliente_atualizado){
        res.status(400).send({mensagem: "Nenhum pedido encontrado com esse cliente"});
    }

    const atualizado = await pedidoService.atualizarPedido(
        cliente_id,
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
    const {id} = req.params;

   await pedidoService.deletarPedido(id);

    res.send({mensagem: "Pedido excluído com sucesso"});
}

const buscarTodos = async(req,res) => {
    let { page , size = 10, projetista, data_pedido } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const skip = (page - 1) * size;
    const query = {};
    if (projetista) query.projetista = projetista;
    if (data_pedido) query.data_pedido = data_pedido

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

module.exports = { inserir, buscarPedidobyId, buscarPedidobyStatus, atualizarPedido, deletarPedido, buscarTodos};