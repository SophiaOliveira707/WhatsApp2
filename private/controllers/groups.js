const dbConnection = require('../services/dbConnection');
const users = dbConnection.models.Usuarios;
const groups = dbConnection.models.Grupos;
const members = dbConnection.models.Membros;

async function getGroups(req, res){
    const { username, password } = req.body;

    const user = await users.findOne({ where: { nome: username, senha: password }, raw: true, logging: false });

    if(user){
        const allGroups = await groups.findAll({ raw: true, logging: false });
    
        res.status(200).send(allGroups.map((group) => {
            return {
                id: group.id,
                name: group.nome,
                img: 'assets/imgs/firefox.png'
            }
        }));
    }else{
        res.status(401).send({ message: 'Usuário ou senha incorretos' });
    }
}

module.exports = { getGroups };