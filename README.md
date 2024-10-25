# Gerenciador de Tarefas com Notificações por E-mail

- Este é um aplicativo simples de gerenciamento de tarefas, onde os usuários podem fazer login, adicionar tarefas e receber notificações por e-mail quando novas tarefas são adicionadas. As notificações por e-mail são enviadas via SendGrid.

## Funcionalidades:

- Adicionar, concluir e excluir tarefas.
- Notificação automática por e-mail enviada ao usuário após a criação de uma nova tarefa.
- Backend implementado usando Node.js com Express.
- SendGrid é utilizado para enviar e-mails aos usuários.

## Pré-requisitos:

Para rodar este projeto, você precisará de:

- Node.js instalado (Baixe em nodejs.org).
- Uma conta SendGrid com uma chave de API (registre-se em SendGrid).

## Instalação:
- Clone este repositório:
````
git clone https://github.com/SEU_USUARIO/task-manager.git
````

### Navegue até o diretório do projeto:
````
cd task-manager
````

### Instale as dependências necessárias:
Execute o comando a seguir para instalar os pacotes necessários do Node.js:
````
npm install
````
#### Isso irá instalar:

- express (para o servidor backend)
- @sendgrid/mail (para envio de e-mails)

## Configuração:

1. Chave de API do SendGrid
Você precisará adicionar sua chave de API do SendGrid ao projeto para ativar as notificações por e-mail.

- Vá para SendGrid e faça login na sua conta.
- Navegue até API Keys nas Configurações e crie uma nova chave de API com acesso total.
- Copie a chave de API.

2. Adicione sua Chave de API ao projeto
- No arquivo backend.js, localize a linha:

```bash
sgMail.setApiKey('insira sua chave');
```
- Substitua 'insira sua chave' pela sua chave real do SendGrid.

3. Verifique o E-mail do Remetente
Certifique-se de que o endereço de e-mail que você está usando no campo from no código esteja verificado no SendGrid. Você pode verificar seu e-mail ou domínio na seção Sender Authentication da sua conta SendGrid.

## Executando o Projeto

1. Inicie o servidor backend:

- No diretório raiz do projeto, execute o seguinte comando para iniciar o backend:

```
node backend.js
````
- Isso iniciará o servidor na porta 3000.

## Como Usar:
Acesse a aplicação: Abra o navegador e vá para o endereço do seu servidor local (por exemplo, http://localhost:3000).

Adicione uma nova tarefa: Após o login, você poderá adicionar novas tarefas pela interface. Assim que uma tarefa for adicionada, um e-mail será enviado para o endereço de e-mail registrado do usuário notificando sobre a nova tarefa.

Estrutura de Arquivos

```
task-manager/
│
├── backend.js             # Backend Node.js para lidar com notificações por e-mail e gerenciamento de tarefas
├── dashboard.js           # Lógica do frontend para gerenciar tarefas (adicionar, excluir, concluir)
├── index.html             # Página de login do gerenciador de tarefas
├── dashboard.html         # Painel de gerenciamento de tarefas
├── style.css              # CSS básico para estilizar a interface
├── package.json           # Dependências do projeto e scripts
└── README.md              # Documentação do projeto
````

## Exemplo do Backend (backend.js)

````
const express = require('express');
const sgMail = require('@sendgrid/mail');
const app = express();

app.use(express.json());  // Para processar requisições JSON

// Defina sua chave de API do SendGrid aqui
sgMail.setApiKey('SUA_CHAVE_API_SENDGRID');

// Rota para enviar e-mail quando uma nova tarefa é adicionada
app.post('/enviar-email', (req, res) => {
    const { tarefa, email } = req.body;

    const msg = {
        to: email,
        from: 'seu-email@example.com',  // Certifique-se de que este e-mail está verificado no SendGrid
        subject: 'Nova Tarefa Adicionada',
        text: `Você adicionou uma nova tarefa:\n\nNome: ${tarefa.nome}\nPrazo: ${tarefa.prazo}\nPrioridade: ${tarefa.prioridade}`
    };

    sgMail.send(msg)
        .then(() => {
            res.json({ message: 'E-mail enviado com sucesso!' });
        })
        .catch((error) => {
            console.error('Erro ao enviar e-mail:', error);
            res.status(500).json({ error: 'Falha no envio do e-mail' });
        });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
````
## Contribuição

- Faça um fork do projeto.
- Crie um branch para sua nova feature (git checkout -b nova-feature).
- Commit suas mudanças (git commit -m 'Adiciona nova feature').
- Faça o push para o branch (git push origin nova-feature).
- Abra um pull request.

# Licença de Uso - Automatizador de Holerites

Este software ("Automatizador de Holerites") foi desenvolvido por Paulo Eduardo Moretti. Ao utilizar, modificar ou distribuir este software, você concorda com os seguintes termos:

## Permissões

- **Uso pessoal**: Você pode utilizar este software para uso pessoal e projetos próprios.
- **Modificações**: Você pode modificar o código-fonte para adaptar o software às suas necessidades, desde que as modificações sejam mantidas em caráter privado ou interno.
- **Distribuição**: Você pode distribuir o software original ou modificado, desde que mantenha esta licença incluída em todas as cópias distribuídas.

## Restrições

- **Uso comercial**: O uso deste software para fins comerciais é **proibido** sem a permissão explícita e por escrito do autor.
- **Garantias**: Este software é fornecido "como está", sem garantias de qualquer tipo. O autor não se responsabiliza por quaisquer danos ou problemas causados pela utilização deste software.
- **Atribuição**: Ao utilizar ou distribuir este software, você deve fornecer a devida atribuição ao autor original, Paulo Eduardo Moretti.

## Limitação de Responsabilidade

Em nenhuma hipótese o autor será responsável por qualquer dano direto, indireto, incidental, especial, exemplar ou consequente (incluindo, mas não se limitando a, aquisição de bens ou serviços substitutos; perda de uso, dados ou lucros; ou interrupção de negócios) decorrente de qualquer forma do uso deste software, mesmo que advertido da possibilidade de tais danos.

## Alterações e Revogação

O autor reserva-se o direito de alterar esta licença a qualquer momento, sem aviso prévio, desde que tal alteração seja devidamente registrada no repositório oficial do projeto. Esta licença poderá ser revogada a qualquer momento em caso de violação de quaisquer de seus termos.

---

© 2024 Paulo Eduardo Moretti. Todos os direitos reservados.
