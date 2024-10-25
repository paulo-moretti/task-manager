// dashboard.js - Lógica de Gerenciamento de Tarefas

// Obter o usuário logado do localStorage
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

// Função para renderizar as tarefas
function renderizarTarefas() {
    const listaTarefas = document.getElementById('task-list');
    listaTarefas.innerHTML = ''; // Limpa a lista antes de renderizar

    // Exibe as tarefas do usuário logado
    usuarioLogado.tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="text-decoration: ${tarefa.concluida ? 'line-through' : 'none'}">
                ${tarefa.nome} - ${tarefa.prazo} - Prioridade: ${tarefa.prioridade}
            </span>
            <button class="concluir-btn">${tarefa.concluida ? 'Concluída' : 'Concluir'}</button>
            <button class="excluir-btn">Excluir</button>
        `;
        listaTarefas.appendChild(li);

        // Evento para concluir a tarefa
        const btnConcluir = li.querySelector('.concluir-btn');
        btnConcluir.addEventListener('click', () => concluirTarefa(index));

        // Evento para excluir a tarefa
        const btnExcluir = li.querySelector('.excluir-btn');
        btnExcluir.addEventListener('click', () => excluirTarefa(index));
    });
}

// Função para concluir uma tarefa
function concluirTarefa(index) {
    usuarioLogado.tarefas[index].concluida = !usuarioLogado.tarefas[index].concluida;  // Alterna entre concluída/não concluída
    salvarUsuario();
    renderizarTarefas();
}

// Função para excluir uma tarefa
function excluirTarefa(index) {
    usuarioLogado.tarefas.splice(index, 1);  // Remove a tarefa do array
    salvarUsuario();  // Salva o novo estado no localStorage
    renderizarTarefas();
}

// Função para salvar os dados do usuário no localStorage
function salvarUsuario() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const indexUsuario = usuarios.findIndex(user => user.email === usuarioLogado.email);
    usuarios[indexUsuario] = usuarioLogado;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Adiciona a função para enviar notificação por e-mail após adicionar a tarefa
document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nomeTarefa = document.getElementById('task-name').value;
    const prazoTarefa = document.getElementById('task-deadline').value;
    const prioridadeTarefa = document.getElementById('task-priority').value;

    const novaTarefa = {
        nome: nomeTarefa,
        prazo: prazoTarefa,
        prioridade: prioridadeTarefa,
        concluida: false
    };

    usuarioLogado.tarefas.push(novaTarefa);  // Adiciona a tarefa ao array de tarefas do usuário
    salvarUsuario();  // Atualiza as tarefas do usuário no localStorage
    renderizarTarefas();  // Re-renderiza a lista de tarefas

    // Envia notificação por e-mail ao adicionar novas tarefas
    fetch('http://localhost:3000/enviar-email', {  // Certifique-se que o backend está rodando na porta 3000
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tarefa: novaTarefa,
            email: usuarioLogado.email  // Envia o e-mail do usuário logado
        })
    }).then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Erro ao enviar e-mail:', error));
});

// Inicializa as tarefas ao carregar a página
renderizarTarefas();
