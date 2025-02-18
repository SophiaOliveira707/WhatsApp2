const dbConnection = require('./dbConnection');

async function checkPermission(username, password, targetUserId){
    const user = await dbConnection.models.Usuarios.findOne({
        where: { nome: username, senha: password }
    });
  
    const targetUser = await dbConnection.models.Usuarios.findOne({
        where: { id: targetUserId }
    });

    if(user == null || targetUser == null){
        return false;
    }
  
    if(user == targetUser || user.dataValues.nome == 'Admin'){
        return true;
    }
  
    return false;
}

module.exports = checkPermission