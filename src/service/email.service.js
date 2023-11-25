const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const templatePath = path.join(__dirname, '..', 'views', 'template.html');
const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

const templatePathProjetista = path.join(__dirname, '..', 'views', 'templatep.html');
const htmlTemplateP = fs.readFileSync(templatePathProjetista, 'utf8');

async function enviarEmail(clienteEmail, clienteNome, ambiente, projetista, orcamento) {

    const email_projetista = projetista == 'Kerolen' ? 'kerol.rosa@hotmail.com' : 'leopadilha008@gmail.com'

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
        html:htmlTemplate.replace('{clienteNome}', clienteNome).replace('{ambiente}', ambiente),
        attachments: [
            {
                filename: 'orçamento.pdf',
                content: orcamento
            }
        ]
    };

    const mailOptionsP = {
        from: 'leonardopad.silva@gmail.com',
        to: email_projetista,
        subject: 'Confirmação do Projeto',
        html:htmlTemplateP.replace('{projetista}', projetista)
    };

    try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(mailOptionsP);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw error
    }
}

module.exports = { enviarEmail }