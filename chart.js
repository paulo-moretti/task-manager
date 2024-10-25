function atualizarGrafico() {
    const tarefasConcluidas = usuarioLogado.tarefas.filter(tarefa => tarefa.concluida).length;
    const tarefasPendentes = usuarioLogado.tarefas.filter(tarefa => !tarefa.concluida && new Date(tarefa.prazo) >= new Date()).length;
    const tarefasAtrasadas = usuarioLogado.tarefas.filter(tarefa => !tarefa.concluida && new Date(tarefa.prazo) < new Date()).length;

    const ctx = document.getElementById('task-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Concluídas', 'Pendentes', 'Atrasadas'],
            datasets: [{
                data: [tarefasConcluidas, tarefasPendentes, tarefasAtrasadas],
                backgroundColor: ['#28a745', '#ffc107', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}


