const dbConnection = require('../services/dbConnection');
const users = dbConnection.models.Usuarios;

async function isAdmin(nome, senha){
    const user = await users.findOne({ where: { nome, senha }, raw: true, logging: false });
    return user && user.nome == 'Admin';//Se o usuário existir e tiver o nome Admin, retorna verdadeiro
}

module.exports = { isAdmin };