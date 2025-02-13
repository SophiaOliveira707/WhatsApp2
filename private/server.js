const dbConnection = require('./services/dbConnection');
const express = require('express');
const path = require('path');
const cors = require('cors');

const server = express();
const port = 80;

server.use(express.static(path.join(__dirname,'..','public')));//Libera acesso a pasta public
server.use(cors());//Usa a política CORS para permitir que o usuário receba os dados corretamente
server.use(express.json());//Permite que o servidor leia jsons de clientes

server.get('/', (req, res) => {//Retorna a pagina inicial ao acessar rota raiz
  res.status(200).sendFile(path.join(__dirname,'..','public','views','login','login.html'));
});

server.get('/register', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'..','public','views','register','register.html'));
});

server.get('/chat', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'..','public','views','chat','chat.html'));
});

server.post('/login', async (req, res) => {
  const { username, password, createAccount } = req.body;//Dados enviados pelo usuário

  if(createAccount){
    const login = await dbConnection.models.Usuarios.findOne({
      where: { nome: username }
    });

    if(login == null){
      const newUser = await dbConnection.models.Usuarios.create({ nome: username, senha: password });
      res.status(200).send({ userId: newUser.dataValues.id });
    }else{
      res.status(401).send({ message: 'Nome de usuário já existe' });
    }
  }else{
    const login = await dbConnection.models.Usuarios.findOne({
      where: { nome: username, senha: password }
    });

    if(login != null){
      res.status(200).send({ userId: login.dataValues.id });
    }else{
      res.status(401).send({ message: 'Usuário ou senha incorretos' });
    }
  }

});

server.listen(port, () => {//Servidor ouvindo na porta 80 (padrão do navegador)
  console.log(`Servidor rodando na porta ${port}`);
});