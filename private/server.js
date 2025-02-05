const express = require('express');
const path = require('path');
const cors = require('cors');

const server = express();
const port = 80;

server.use(express.static(path.join(__dirname,'..','public')));// libera acesso a pasta public
server.use(cors());//Usa a política CORS para permitir que o usuário receba os dados corretamente
server.use(express.json());//Permite que o servidor leia jsons de clientes

server.get('/', (req, res) => {//retorna a pagina inicial ao acessar rota raiz
  res.sendFile(path.join(__dirname,'..','public','login.html'));
});

server.post('/login', (req,res) => {
  console.log('Dados recebidos:');
  console.log(req.body);

  res.send({ message: 'parabens' });
});

server.listen(port, () => {//servidor ouvindo na porta 80 (padrão do navegador)
  console.log(`Servidor rodando na porta ${port}`);
});