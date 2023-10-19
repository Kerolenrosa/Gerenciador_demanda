
const usuarioService = require('../service/usuario.service')

const inserir = async (req, res) => {
    const {usuario, senha, tipo} = req.body;

    if (!usuario || !senha || !tipo){
        res.status(400).send({mensagem: "Preencha todos os campos "});
    }
    
    const usuarioCriado = await usuarioService.criarUsuario(req.body);

    if (!usuarioCriado) {
        return res.status(400).send({mensagem: "Erro ao criar usuario"})
    }

    res.status(201).send({
        usuario: {
            usuario,
            tipo,
            id: usuarioCriado._id
        },
        mensagem: "Usuário criado com sucesso",
    });
}

const buscarTodosUsuarios = async (req, res) => {
    const usuarios = await usuarioService.buscarTodosUsuarios();

    if (usuarios.length === 0 ){
        return res.status(400).send({mensagem: "Não possui usuarios cadastrados."});
    }

    return res.status(200).json(usuarios);
}


const logarUsuario = async (req, res) => {
    const {usuario, senha} = req.body;

    const encontrouUsuario = await usuarioService.buscarUsuario(req.body);
    
    if (!encontrouUsuario){
        return res.status(400).send({mensagem: "Usuário não encontrado"});
    }

    if (encontrouUsuario.tipo == "V") {
        cargo = "Vendedor";
    }

    if (encontrouUsuario.tipo == "A") {
        cargo = "Admin";
    }

    if (encontrouUsuario.tipo == "P") {
        cargo = "Projetista";
    }
    const tipo = encontrouUsuario.tipo
    res.status(200).send({
        usuario: {
            usuario,
            cargo,
            tipo       
        },
        mensagem: "Usuário encontrado"
    });
}

module.exports = { inserir, buscarTodosUsuarios, logarUsuario};