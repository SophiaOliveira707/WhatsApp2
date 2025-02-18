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

server.get('/admin', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'..','public','views','admin','admin.html'));
});

server.post('/login', async (req, res) => {
  const { username, password, createAccount } = req.body;//Dados enviados pelo usuário

  const page = username == 'Admin' ? 'admin' : 'chat';

  if(createAccount){
    const login = await dbConnection.models.Usuarios.findOne({
      where: { nome: username }
    });

    if(login == null){
      const newUser = await dbConnection.models.Usuarios.create({ nome: username, senha: password });
      res.status(200).send({ page });
    }else{
      res.status(400).send({ message: 'Nome de usuário já existe' });
    }
  }else{
    const login = await dbConnection.models.Usuarios.findOne({
      where: { nome: username, senha: password }
    });

    if(login != null){
      res.status(200).send({ page });
    }else{
      res.status(401).send({ message: 'Usuário ou senha incorretos' });
    }
  }
});

async function checkPermission(username, password, targetUserId){
  const user = await dbConnection.models.Usuarios.findOne({
    where: { nome: username, senha: password }
  });

  const targetUser = await dbConnection.models.Usuarios.findOne({
    where: { id: targetUserId }
  });

  if(user == targetUser || user.dataValues.nome == 'Admin'){
    return true;
  }

  return false;
}

server.post('/getUsers', async (req, res) => {
  const { username, password } = req.body;
  const permission = await checkPermission(username, password, 1);//Permissão para mexer no Admin (id = 1)
  
  if(permission){
    const allUsers = await dbConnection.models.Usuarios.findAll();
    res.status(200).json(allUsers);
  }else{
    res.status(401).send({ message: 'Credenciais incorretas' });
  }
});

server.post('/editUser', async (req, res) => {
  const { username, password, targetUserId } = req.body;
  const permission = await checkPermission(username,password,targetUserId);
  if(permission){
    res.status(200).send({ page: 'página de edição de usuário' });
  }else{
    res.status(401).send({ message: 'Credenciais Inválidas' });
  }
});

server.post('/deleteUser', async (req, res) => {
  const { username, password, targetUserId } = req.body;
  const permission = await checkPermission(username,password,targetUserId);
  if(permission){
    const user = await dbConnection.models.Usuarios.findOne({
      where: { id: targetUserId }
    });
    await user.destroy();
    res.status(200).send({ message: 'Usuário apagado com sucesso' });
  }else{
    res.status(401).send({ message: 'Credenciais Inválidas' });
  }
});

server.listen(port, () => {//Servidor ouvindo na porta 80 (padrão do navegador)
  console.log(`Servidor rodando na porta ${port}`);
});