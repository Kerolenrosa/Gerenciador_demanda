
const usuarioService = require('../service/usuario.service')

const inserir = async (req, res) => {
    const {usuario, senha} = req.body;

    if (!usuario || !senha){
        res.status(400).send({mensagem: "Preencha todos os campos "});
    }
    
    const usuarioCriado = await usuarioService.criarUsuario(req.body);

    if (!usuarioCriado) {
        return res.status(400).send({mensagem: "Erro ao criar usuario"})
    }

    res.status(201).send({
        usuario: {
            usuario,
            id: usuarioCriado._id
        },
        mensagem: "Usuário criado com sucesso",
    });
}

const buscarTodosUsuarios = async (req, res) => {
    console.log('entrou')
    const usuarios = await usuarioService.buscarTodosUsuarios();

    if (usuarios.length === 0 ){
        return res.status(400).send({mensagem: "Não possui usuarios cadastrados."});
    }

    return res.status(200).json(usuarios);
}

module.exports = { inserir, buscarTodosUsuarios};