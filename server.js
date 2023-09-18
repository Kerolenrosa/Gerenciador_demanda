const express = require('express')
const usuarioRota = require('./src/route/usuario.route')
const app = express()
const conectaBD = require("./src/database/db");

const porta = 3000

conectaBD()
app.use(express.json())
app.use('/user', usuarioRota)

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`))    

