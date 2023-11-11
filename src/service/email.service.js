const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const templatePath = path.join(__dirname, '..', 'views', 'template.html');
const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

async function enviarEmail(clienteEmail, clienteNome, ambiente) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'leonardopad.silva@gmail.com',
            pass: 'nmnz mkzl yrts dfgt'
        },
        secure: true
    });

    const mailOptions = {
        from: 'leonardopad.silva@gmail.com',
        to: clienteEmail,
        subject: 'Confirmação do Projeto',
        html:htmlTemplate.replace('{clienteNome}', clienteNome).replace('{ambiente}', ambiente)
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw error
    }
}

module.exports = { enviarEmail }