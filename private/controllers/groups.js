const dbConnection = require('../services/dbConnection');
const groups = dbConnection.models.Grupos;

async function getGroups(req, res){
    const allGroups = await groups.findAll({ raw: true, logging: false });

    res.status(200).send(allGroups.map((group) => {
        return {
            id: group.id,
            name: group.nome,
            img: 'assets/imgs/firefox.png'
        }
    }));
}

module.exports = { getGroups };