const express = require('express');
const path = require('path');
const cors = require('cors');

const server = express();
const port = 80;

server.use(express.static(path.join(__dirname,'..','public')));//Libera acesso a pasta public
server.use(cors());//Usa a política CORS para permitir que o usuário receba os dados corretamente
server.use(express.json());//Permite que o servidor leia jsons de clientes

server.get('/', (req, res) => {//Retorna a pagina inicial ao acessar rota raiz
  res.status(200).sendFile(path.join(__dirname,'..','public','login.html'));
});

server.get('/chat', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'..','public','chat.html'));
});

server.post('/login', (req, res) => {
  const { username, password } = req.body;//Dados enviados pelo usuário
  if(username == 'Sophia' && password == '1234'){
    res.status(200).send({ message: 'parabens' });
  }else{
    res.status(401).send({ message: 'sai daqui pobre' });
  }
});

server.listen(port, () => {//Servidor ouvindo na porta 80 (padrão do navegador)
  console.log(`Servidor rodando na porta ${port}`);
});