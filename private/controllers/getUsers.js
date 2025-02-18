const dbConnection = require('../services/dbConnection');
const checkPermission = require('../services/checkPermission');

async function getUsers(req, res){
    const { username, password } = req.body;
    const permission = await checkPermission(username, password, 1);//Permissão para mexer no Admin (id = 1)
    
    if(permission){
        const allUsers = await dbConnection.models.Usuarios.findAll();
        res.status(200).json(allUsers);
    }else{
        res.status(401).send({ message: 'Credenciais incorretas' });
    }
}

module.exports = getUsers;