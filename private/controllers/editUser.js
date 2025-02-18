const dbConnection = require('../services/dbConnection');
const checkPermission = require('../services/checkPermission');

async function editUser(req, res){
    const { username, password, targetUserId } = req.body;
    const permission = await checkPermission(username,password,targetUserId);
    if(permission){
        res.status(200).send({ page: 'página de edição de usuário' });
    }else{
        res.status(401).send({ message: 'Credenciais Inválidas' });
    }
}

module.exports = editUser;