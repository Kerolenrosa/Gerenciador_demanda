const express = require('express')
const usuarioRota = require('./src/route/usuario.route')
const pedidoRota = require('./src/route/pedido.route')
const app = express()
const cors = require('cors')
const conectaBD = require("./src/database/db");

const porta = 3000

conectaBD()
app.use(cors())
app.use(express.json())
app.use('/user', usuarioRota)
app.use('/pedido', pedidoRota)

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`))    

