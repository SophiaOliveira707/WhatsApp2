const dbConnection = require('../services/dbConnection');
const users = dbConnection.models.Usuarios;
const members = dbConnection.models.Membros;

async function login(req, res){
    const { username, password, createAccount } = req.body;//Dados enviados pelo usuário

    //Se o nome do usuário for Admin, vai para a página de admin, se não, vai para o chat
    const page = username == 'Admin' ? 'admin' : 'chat';

    //Procura no banco de dados 1 usuário com o nome enviado
    const login = await users.findOne({ where: { nome: username }, raw: true, logging: false });

    if(createAccount && login != null){//Se tentando criar uma conta com um username que já existe
        return res.status(400).send({ message: 'Nome de usuário já existe' });
    }else if(!createAccount && login == null){//Conta não existe
        return res.status(401).send({ message: 'Usuário não existe' });
    }

    if(createAccount){
        const user = await users.create({ nome: username, senha: password },{ logging: false });
        await members.create({ id_usuario: user.dataValues.id, id_grupo: 1 },{ logging: false });
    }else if(password != login.senha){
        return res.status(401).send({ message: 'Usuário ou senha incorretos' });
    }

    res.status(200).send({ page });
}

module.exports = { login };