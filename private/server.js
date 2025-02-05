const express = require('express');
const path = require('path');

const server = express();
const port = 80;

server.use(express.static(path.join(__dirname,'..','public')));// libera acesso a pasta public

server.get('/', (req, res) => {//retorna a pagina inicial ao acessar rota raiz
  res.sendFile(path.join(__dirname,'..','public','home.html'));
});

server.listen(port, () => {//servidor ouvindo na porta 80 (padrão do navegador)
  console.log(`Servidor rodando na porta ${port}`);
});