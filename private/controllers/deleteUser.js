const dbConnection = require('../services/dbConnection');
const checkPermission = require('../services/checkPermission');

async function deleteUser(req, res){
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
}

module.exports = deleteUser;