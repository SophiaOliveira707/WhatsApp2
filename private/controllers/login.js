const dbConnection = require('../services/dbConnection');

async function login(req, res){
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
}

module.exports = login;