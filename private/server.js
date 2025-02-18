const login = require('./controllers/login');
const getUsers = require('./controllers/getUsers');
const editUser = require('./controllers/editUser');
const deleteUser = require('./controllers/deleteUser');
const express = require('express');
const path = require('path');
const cors = require('cors');

class Server{
  constructor(){
    this.server = express();
    this.port = 80;

    this.serverProperties();
    this.serverPages();
    this.serverRoutes();
  }

  serverProperties(){
    this.server.use(express.static(path.join(__dirname,'..','public')));//Libera acesso a pasta public
    this.server.use(cors());//Usa a política CORS para permitir que o usuário receba os dados corretamente
    this.server.use(express.json());//Permite que o servidor leia jsons de clientes
  }

  serverPages(){
    const views = path.join(__dirname,'..','public','views');

    this.server.get('/', (req, res) => {
      res.status(200).sendFile(path.join(views,'login','login.html'));
    });
    
    this.server.get('/register', (req, res) => {
      res.status(200).sendFile(path.join(views,'register','register.html'));
    });
    
    this.server.get('/chat', (req, res) => {
      res.status(200).sendFile(path.join(views,'chat','chat.html'));
    });
    
    this.server.get('/admin', (req, res) => {
      res.status(200).sendFile(path.join(views,'admin','admin.html'));
    });

    this.server.get('/edit', (req, res) => {
      res.status(200).sendFile(path.join(views,'edit','editusuarios.html'));
    });
  }

  serverRoutes(){
    this.server.post('/login', login);
    this.server.post('/getUsers', getUsers);
    this.server.post('/editUser', editUser);
    this.server.post('/deleteUser', deleteUser);
  }

  run(){
    this.server.listen(this.port, () => {//Servidor ouvindo na porta 80 (padrão do navegador)
      console.log(`Servidor rodando na porta ${this.port}`);
    });
  }
}

const server = new Server();
server.run();