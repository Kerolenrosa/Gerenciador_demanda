const express = require('express')
const userRoute = require('./src/route/user.route')
const app = express()

const porta = 3000
app.use(express.json())
app.use('/user', userRoute)

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`))    

