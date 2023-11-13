const mongoose = require('mongoose')

const conectaBD = () => {
    console.log("Aguarde a conexão")

    mongoose.connect("mongodb+srv://leonardopadsilva:tcc123456@cluster0.nx8puxp.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Banco de dados conectado com sucesso"))
    .catch((error) => console.log(error));
};

module.exports = conectaBD;