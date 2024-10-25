const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Simular login do usuário
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Previne o comportamento padrão do formulário (refresh da página)

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);

    if (usuarioEncontrado) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        window.location.href = "dashboard.html";  // Redireciona para o dashboard
    } else {
        alert('Usuário ou senha incorretos!');  // Exibe um alerta se o login falhar
    }
});

// Registro de novos usuários
document.getElementById('register-link').addEventListener('click', function(e) {
    e.preventDefault();  // Previne o comportamento padrão do link

    const email = prompt("Digite seu email para registrar:");
    const password = prompt("Digite uma senha:");

    if (email && password) {
        // Verifica se o email já está cadastrado
        const usuarioExistente = usuarios.find(user => user.email === email);
        if (usuarioExistente) {
            alert("Esse email já está registrado.");
        } else {
            // Cria um novo usuário e salva no localStorage
            const novoUsuario = { email, password, tarefas: [] };
            usuarios.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert('Registrado com sucesso! Faça login.');
        }
    }
});

