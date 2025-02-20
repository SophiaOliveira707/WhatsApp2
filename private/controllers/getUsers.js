const dbConnection = require('../services/dbConnection');
const checkPermission = require('../services/checkPermission');

async function getUsers(req, res){
    const { username, password } = req.body;
    const admin = await checkPermission(username, password, 1);//Permissão para mexer no Admin (id = 1)
    
    if(admin){
        const allUsers = await dbConnection.models.Usuarios.findAll();
        res.status(200).json(allUsers);
    }else{
        const allUsersNoPassword = await dbConnection.models.Usuarios.findAll({
            attributes: ['id','nome'],
        });
        res.status(200).send(allUsersNoPassword.filter(user => user.nome != 'Admin' && user.nome != username));
    }
}

module.exports = getUsers;