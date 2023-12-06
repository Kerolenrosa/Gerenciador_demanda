const mongoose = require('mongoose')

const conectaBD = () => {
    console.log("Aguarde a conexão")

    mongoose.connect(process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Banco de dados conectado com sucesso"))
    .catch((error) => console.log(error));
};

module.exports = conectaBD;