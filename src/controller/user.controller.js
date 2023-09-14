const inserir = (req, res) => {
    const {usuario, senha} = req.body;

    if (!usuario || !senha){
        res.status(400).send({mensagem: "Preencha todos os campos "});
    }

    res.status(201).send({         
        usuario: {
            usuario,
        },
        mensagem: "Usuário criado com sucesso",
    });
}

module.exports = { inserir };