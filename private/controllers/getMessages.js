const dbConnection = require('../services/dbConnection');

async function getMessages(req, res){
    const { username, password, id } = req.body;
    const user = await dbConnection.models.Usuarios.findOne({
        attributes: ['id'],
        where: { nome: username, senha: password }
    });

    if(user){
        const userMessages = await dbConnection.models.Mensagens.findAll({
            where: { id_remetente: id, id_destinatario: user.dataValues.id }
        });

        const selfMessages = await dbConnection.models.Mensagens.findAll({
            where: { id_remetente: user.dataValues.id, id_destinatario: id }
        });

        res.status(200).send({ userMessages, selfMessages });
    }else{
        res.status(400).send();
    }
}

module.exports = getMessages;