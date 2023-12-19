import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 3000;
const host =  '0.0.0.0';

var listaUsuarios = [];
var listaPets = [];
var listaAdocao = [];

function processarCadastroUsuario(requisicao, resposta){
    const dados = requisicao.body;
    let conteudoResposta = '';

    if(!(dados.nome && dados.email && dados.telefone))
    {
        conteudoResposta=`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
            body {
                background-image: url(fundoanimal.jpg);
                display: flex;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
        
            .container {
                background-color: white;
                border-radius: 8px;
                border: 2px solid black;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
        
            label { 
                font-weight: 800; 
                color: rgb(0, 0, 0);
            }
        
            .btn-success {
                padding: 10px;
                font-size: 16px;
            }
            </style>
        </head> 
        <body>
            <div class="container col-md-4" style="padding: 30px;">
                <form action='/cadastrarUsuario' method="POST"  class="row col-12 needs-validation mx-auto my-auto" novalidate>
                
                    <legend class="mb-3 text-center" style="font-weight: 800;">Cadastro de Interessados</legend>
                    <div class="col-md-6">
                        <div class="mb-3">
                        <label for="nome" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" name="nome" required>
                        ${!dados.nome ? `<p class="text-danger">Por favor, informe o nome!</p>` : ''}
                        </div>
                    </div>
        `;
        
        conteudoResposta+=`
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="email" class="form-label">E-Mail</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="exemplo@gmail.com" required>
                    ${!dados.email ? `<p class="text-danger">Por favor, informe o email!</p>` : ''}
                </div>
            </div>
        `;


        conteudoResposta+=`
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="telefone" class="form-label">Telefone</label>
                        <input type="tel" class="form-control" id="telefone" name="telefone" required>
                        ${!dados.telefone ? `<p class="text-danger">Por favor, informe um telefone!</p>` : ''}
                    </div>
                </div>
        `;
        
        conteudoResposta +=`
                                <div class="col-12 mt-4">
                                    <button class="btn btn-success" type="submit">Cadastrar</button>
                                </div>
                            
                        </form>
                    </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
                </body>
            </html>
        `;
        resposta.end(conteudoResposta)
    }
    else {
    const usuario = {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
    } 
    listaUsuarios.push(usuario);

    conteudoResposta =`
            <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Interessados</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <style>
                body {
                    background-image: url(fundoanimal.jpg);
                    display: flex;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }

                .container {
                    background-color: #585d63fa;
                    border-radius: 8px;
                    border: 2px solid black;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }

                label {
                    font-weight: 800;
                    color: rgb(0, 0, 0);
                }

                .btn-success,
                .btn-danger {
                    padding: 10px;
                    font-size: 16px;
                    width: 20%;
                }

                .btn-danger {
                    margin-top: 10px;
                    float: left;
                }

                .btn-success {
                    margin-top: 20px;
                    float: right;
                }

                th,
                td {
                    color: white;
                }

                th {
                    background-color: #28a745;
                }

                tbody tr:nth-child(odd) {
                    background-color: #e0e0e0;
                }

                tbody tr:nth-child(even) {
                    background-color: #f0f0f0;
                }

                @media (max-width: 767px) {
                    .btn-success,
                    .btn-danger {
                        width: 100%;
                        float: none;
                    }
                }

            </style>
        </head>

<body>
    <div class="container col-md-8" style="padding: 20px;">
        <h1 class="text-center" style="font-weight: 700;color: black;">Lista de Interessados Cadastrados</span></h1>
        <div style="border-radius: 5px;"> 
        <table class="table table-striped table-hover mt-2 mx-auto my-auto">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                </tr>
            </thead>
                <tbody> `;

                for (const usuario of listaUsuarios){
                    conteudoResposta += `
                        <tr>
                            <td>${usuario.nome}</td>
                            <td>${usuario.email}</td>
                            <td>${usuario.telefone}</td>
                        <tr>
                    `;
                }

                conteudoResposta += `
                            </tbody>
                        </table>
                        </div>
                        <a class="btn btn-danger" href="/" role"button"> Voltar ao Menu</a>
                        <a class="btn btn-success" href="/cadastroUsuario.html" role"button"> Cadastrar Interessados </a>
                    </body>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script
                    </html>
                `;
                resposta.end(conteudoResposta);
                }
}

function processarCadastroPet(requisicao, resposta){
    const dadospet = requisicao.body;
    let conteudoResposta = '';

    if(!(dadospet.nome && dadospet.raca && dadospet.idade))
    {
        conteudoResposta=`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
            body {
                background-image: url(fundoanimal.jpg);
                display: flex;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
        
            .container {
                background-color: white;
                border-radius: 8px;
                border: 2px solid black;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
        
            label { 
                font-weight: 800; 
                color: rgb(0, 0, 0);
            }
        
            .btn-success {
                padding: 10px;
                font-size: 16px;
            }
            </style>
        </head> 
        <body>
            <div class="container col-md-4" style="padding: 30px;">
                <form action='/cadastrarPet' method="POST"  class="row col-12 needs-validation mx-auto my-auto" novalidate>
                
                    <legend class="mb-3 text-center" style="font-weight: 800;">Cadastro de Pets</legend>
                    <div class="col-md-6">
                        <div class="mb-3">
                        <label for="nome" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" name="nome" required>
                        ${!dadospet.nome ? `<p class="text-danger">Por favor, informe o nome!</p>` : ''}
                        </div>
                    </div>
        `;
        
        conteudoResposta+=`
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="raca" class="form-label">Raça</label>
                    <input type="text" class="form-control" id="raca" name="raca" required>
                    ${!dadospet.raca ? `<p class="text-danger">Por favor, informe a raça!</p>` : ''}
                </div>
            </div>
        `;


        conteudoResposta+=`
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="idade" class="form-label">Idade em anos do pet</label>
                        <input type="text" class="form-control" id="idade" name="idade" required>
                        ${!dadospet.idade ? `<p class="text-danger">Por favor, informe a idade!</p>` : ''}
                    </div>
                </div>
        `;
        
        conteudoResposta +=`
                                <div class="col-12 mt-4">
                                    <button class="btn btn-success" type="submit">Cadastrar Animal</button>
                                </div>
                            
                        </form>
                    </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
                </body>
            </html>
        `;
        resposta.end(conteudoResposta)
    }
    else {
    const usuariopet = {
        nome: dadospet.nome,
        raca: dadospet.raca,
        idade: dadospet.idade,
    } 
    listaPets.push(usuariopet);

    conteudoResposta =`
            <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Pets Cadastrados</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <style>
                body {
                    background-image: url(fundoanimal.jpg);
                    display: flex;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }

                .container {
                    background-color: #585d63fa;
                    border-radius: 8px;
                    border: 2px solid black;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }

                label {
                    font-weight: 800;
                    color: rgb(0, 0, 0);
                }

                .btn-success,
                .btn-danger {
                    padding: 10px;
                    font-size: 16px;
                    width: 20%;
                }

                .btn-danger {
                    margin-top: 10px;
                    float: left;
                }

                .btn-success {
                    margin-top: 20px;
                    float: right;
                }

                th,
                td {
                    color: white;
                }

                th {
                    background-color: #28a745;
                }

                tbody tr:nth-child(odd) {
                    background-color: #e0e0e0;
                }

                tbody tr:nth-child(even) {
                    background-color: #f0f0f0;
                }

            </style>
        </head>

<body>
    <div class="container col-md-8" style="padding: 20px;">
        <h1 class="text-center" style="font-weight: 700;color: black;">Lista de Pets Cadastrados</h1>
        <div style="border-radius: 5px;"> 
        <table class="table table-striped table-hover mt-2 mx-auto my-auto">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Raça</th>
                    <th>Idade em anos</th>
                </tr>
            </thead>
                <tbody> `;

                for (const usuariopet of listaPets){
                    conteudoResposta += `
                        <tr>
                            <td>${usuariopet.nome}</td>
                            <td>${usuariopet.raca}</td>
                            <td>${usuariopet.idade}</td>
                        <tr>
                    `;
                }

                conteudoResposta += `
                            </tbody>
                        </table>
                        </div>
                        <a class="btn btn-danger" href="/" role"button"> Voltar ao Menu</a>
                        <a class="btn btn-success" href="/cadastroPet.html" role"button"> Cadastrar Pet </a>
                    </body>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script
                    </html>
                `;
                resposta.end(conteudoResposta);
                }
}



function processarAdocao(requisicao, resposta){
    const dados = requisicao.body;
    let conteudoResposta = '';

    if(!(dados.name && dados.pet))
    {
        conteudoResposta=`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Adotar um Pet</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                body {
                    background-image: url(fundoanimal.jpg);
                    display: flex;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
        
                .container {
                    width: 70%;
                    margin: auto;
                    background-color: white;
                    border-radius: 8px;
                    border: 2px solid black;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    align-items: center;
                }
        
                label { 
                    font-weight: 800; 
                    color: black;
                }
                
                .btn-success,
                .btn-danger {
                    padding: 10px;
                    font-size: 16px;
                    width: 20%;
                }
    
                .btn-danger {
                    margin-top: 10px;
                    float: right;
                }
    
                .btn-success {
                    margin-top: 20px;
                    float: left;
                }

            </style>
        </head>
        <body>
            <div class="container">
                <h1 class="" style="font-weight: 700;color: black;">Adotar um Pet</h1>
                <form action="/adotarpet" method="POST" class="row g-3 needs-validation mx-auto my-auto" novalidate>
                <div class="col-md-4">
                <div class="mb-3">
                    <label for="name" class="form-label">Nome do Interessado</label>
                    <select class="form-select" id="name" name="name" required>
                    <option selected disabled value="">Escolha um interessado...</option>
        `;
        
        for (const usuario of listaUsuarios) {
            conteudoResposta += `<option value="${usuario.nome}">${usuario.nome}</option>`;
        }

        conteudoResposta += `
                    </select>
                    ${!dados.name ? `<p class="text-danger">Por favor, informe um nome!</p>` : ''}
                </div>
            </div>
        `;

        conteudoResposta +=`
                <div class="col-md-4">
                        <div class="mb-3">
                            <label for="pet" class="form-label">Nome do Pet</label>
                            <select class="form-select" id="pet" name="pet" required>
                            <option selected disabled value="">Escolha um pet...</option>
        `;
        for (const usuariopet of listaPets) {
            conteudoResposta += `<option value="${usuariopet.nome}">${usuariopet.nome}</option>`;
        }                    
        
        conteudoResposta += `
                        </select>    
                        ${!dados.pet ? `<p class="text-danger">Por favor, informe um pet a ser adotado!</p>` : ''}
                        </div>
                </div>
        `;
        
        conteudoResposta += `
                <div class="col-12 mt-3">
                            <button class="btn btn-success" type="submit">Enviar</button>
                            <a class="btn btn-danger" href="/" role="button">Voltar</a>
                            
                </div>
                    
                </form>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
            </body>
            </html>
        `;

        resposta.end(conteudoResposta)
    }
    else {
        const usuarios = {
            name: dados.name,
            pet: dados.pet,
            dataHora: new Date(), // Adiciona a data e hora atual
        };
        listaAdocao.push(usuarios);

        conteudoResposta = `
        <!DOCTYPE html>
        <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Adoçao</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <style>
                body {
                    background-image: url(fundoanimal.png);
                    display: flex;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
    
                .container {
                    background-color: #585d63fa;
                    border-radius: 8px;
                    border: 2px solid black;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }
    
                label {
                    font-weight: 800;
                    color: rgb(0, 0, 0);
                }
    
                .btn-success,
                .btn-danger {
                    padding: 10px;
                    font-size: 16px;
                    width: 20%;
                }
    
                .btn-danger {
                    margin-top: 10px;
                    float: left;
                }
    
                .btn-success {
                    margin-top: 20px;
                    float: right;
                }
    
                th,
                td {
                    color: white;
                }
    
                th {
                    background-color: #2868a7;
                }
            </style>
        </head>
    
        <body>
            <div class="container col-md-8" style="padding: 20px;">
                <h1 class="text-center" style="font-weight: 700;color: black;">Lista Adoção Pet</h1>
                <div style="border-radius: 5px;"> 
                    <table class="table table-striped table-hover mt-2 mx-auto my-auto">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Pet</th>
                                <th>Solicitado em:</th>
                            </tr>
                        </thead>
                        <tbody> `;
    
    for (const usuario of listaAdocao) {
        const dataHoraFormatada = usuario.dataHora.toLocaleString(); // Formata a data e hora
        conteudoResposta += `
            <tr style="background-color: #585d63fa">
                <td>${usuario.name}</td>
                <td>${usuario.pet}</td>
                <td>${dataHoraFormatada}</td> <!-- Adiciona a coluna de data e hora -->
            </tr>
        `;
    }
    
    conteudoResposta += `
                        </tbody>
                    </table>
                </div>
                <a class="btn btn-success" style="background-color: #2868a7; border: blue;" href="/adotarpet.html" role="button">Adotar Pet</a>
                <a class="btn btn-danger" href="/login.html" role="button">Logout</a>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
    
        </html>
    `;
    
    resposta.end(conteudoResposta);
    }
}

function autenticar(requisicao, resposta, next) {
    const rotasSemAutenticacao = ['/cadastrarUsuario', '/cadastrarPet', '/adotarpet']; 

    if (rotasSemAutenticacao.includes(requisicao.path)) {
        next(); 
    } else {
        if (requisicao.session.usuarioAutenticado) {
            next();
        } else {
            resposta.redirect("/login.html");
        }
    }
}

const app = express();

app.use(cookieParser());


app.use(session({
    secret: "M1nH4Ch4v3S3cR3t4",
    resave: true, 
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30 //tempo de vida da sessão
    }
}));


app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(),'paginas')));

app.get('/',autenticar, (requisicao, resposta) =>{
    const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
    const data = new Date();
    resposta.cookie("DataUltimoAcesso", data.toLocaleString(), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    });

    resposta.end (`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>MENU</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                body {
                    background-image: url(paginas/fundoanimal.png);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    background-image: url(fundoanimal.png);
                    border-radius: 8px;
                    border: 2px solid black;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    max-width: 700px; 
                    width: 100%;
                    align-items: center;
                }
                label { 
                    font-weight: 800; 
                }
                .btn-success {
                    padding: 10px;
                    font-size: 16px;
                }
                .custom-button {
                    font-size: 1.5em;
                    padding: 10px;
                    width: 400px;
                    align-items: center;
                    text-decoration: none;
                    border: 2px solid #28a745;
                    border-radius: 8px;
                    background-color: #ffffff;
                    display: inline-block;
                }
                .custom-button:hover {
                    background-color: #28a745;
                    color: #ffffff;
                    border-color: #ffffff;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="row g-3 needs-validation mx-auto my-auto">
                    <legend class="mb-3 text-center" style="font-weight: 800;">MENU</legend>
                    <div class="col-md-12">
                        <p><a href="/cadastroUsuario.html" class="custom-button">Cadastro de Interessados</a></p>
                    </div>
                    <div class="col-md-12">
                        <p><a href="/cadastroPet.html" class="custom-button">Cadastro de Pets</a></p>
                    </div>
                    <div class="col-md-12">
                        <p><a href="/adotarpet.html" class="custom-button">Adotar um Pet</a></p>
                    </div>
                    <footer>
                        <p style="font-size: 16px;">Seu último acesso foi em <strong>${dataUltimoAcesso}</strong></p>
                    </footer>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
        </html>

        `);
});

app.post('/login' , (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;

        if(usuario && senha && (usuario === 'isabella') && (senha === '123')){
            requisicao.session.usuarioAutenticado = true;
            resposta.cookie('NomeUsuario', usuario, {
                maxAge: 1800000,   //faz com que o login tenha validade de 30 minutos
                httpOnly: true
            });
            resposta.redirect('/');
        }
        else{
            resposta.end(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Falha na autenticação</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; margin: 100px;">
            
                <h3 style="color: #e74c3c;">Usuário ou senha inválidos!</h3>
            
                <a href="/login.html" class="btn btn-primary" style="text-decoration: none;">Voltar ao login</a>
            
            </body>
            </html>
            `);
        }
}); 

app.post('/cadastrarUsuario',autenticar, processarCadastroUsuario);
app.post('/cadastrarPet',autenticar, processarCadastroPet);
app.post('/adotarpet', processarAdocao);



app.listen(porta, host, () => {
    console.log(`Servidor executando na url https://${host}:${porta}`)
});