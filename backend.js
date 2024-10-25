// backend.js - Configuração para envio de e-mails com SendGrid

const express = require('express');
const sgMail = require('@sendgrid/mail');
const app = express();

app.use(express.json());  // Para processar requisições JSON

// Substitua pela sua chave de API do SendGrid
sgMail.setApiKey('insira sua chave');  // SUA CHAVE API SENDGRID

// Rota para envio de e-mail
app.post('/enviar-email', (req, res) => {
    const { tarefa, email } = req.body;  // Recebe a tarefa e o e-mail do usuário logado

    // Verifica se o e-mail e a tarefa foram passados corretamente
    if (!email || !tarefa) {
        return res.status(400).json({ error: 'Faltando dados: e-mail ou tarefa não fornecidos.' });
    }

    const msg = {
        to: email,  // O e-mail do usuário logado (destinatário)
        from: 'pauloeduardo.sm20@gmail.com',  // Seu e-mail verificado no SendGrid (remetente)
        subject: 'Nova Tarefa Adicionada',
        text: `Você adicionou uma nova tarefa:\n\nNome: ${tarefa.nome}\nPrazo: ${tarefa.prazo}\nPrioridade: ${tarefa.prioridade}`
    };

    // Envia o e-mail usando SendGrid
    sgMail.send(msg)
        .then(() => {
            res.json({ message: 'E-mail enviado com sucesso!' });
        })
        .catch((error) => {
            console.error('Erro ao enviar e-mail:', error);
            res.status(500).json({ error: 'Erro ao enviar e-mail' });
        });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
