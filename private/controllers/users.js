const dbConnection = require('../services/dbConnection');
const { isAdmin } = require('../utils/checkAdmin');
const users = dbConnection.models.Usuarios;

async function getUsers(req, res){
    const { username } = req.body;

    const allUsers = await users.findAll({ raw: true, logging: false });
    const filteredUsers = allUsers.filter(user => user.nome != 'Admin' && user.nome != username);

    res.status(200).send(filteredUsers.map((user) => {//Retorna todos usuários menos você mesmo e o Admin
        return {
            id: user.id,
            name: user.nome,
            img: 'assets/imgs/fotodeusuario.jpeg'
        }
    }));
}

async function editUser(req, res){
    const { username, password, id, newUser, newPassword } = req.body;

    if(isAdmin(username,password)){
        const user = await users.findOne({ where: { id }, logging: false });
        if(user){
            //Alterar usuário aqui
            res.status(200).send({ message: 'Usuário alterado com sucesso' });
        }else{
            res.status(404).send({ message: 'Usuário não encontrado' });
        }
    }else{
        res.status(401).send({ message: 'Você não tem permissão para fazer isso' });
    }
}

async function deleteUser(req, res){
    const { username, password, id } = req.body;

    if(isAdmin(username,password)){
        const user = await users.findOne({ where: { id }, logging: false });
        if(user){
            user.destroy();
            res.status(200).send({ message: 'Usuário apagado com sucesso' });
        }else{
            res.status(404).send({ message: 'Usuário não encontrado' });
        }
    }else{
        res.status(401).send({ message: 'Você não tem permissão para fazer isso' });
    }
}

module.exports = { getUsers, editUser, deleteUser };