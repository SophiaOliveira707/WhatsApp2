const dbConnection = require('../services/dbConnection');
const users = dbConnection.models.Usuarios;
const messages = dbConnection.models.Mensagens;
const groups = dbConnection.models.Grupos;
const members = dbConnection.models.Membros;

async function getMessages(req, res){
    const { username, password } = req.body;

    const user = await users.findOne({ where: { nome: username, senha: password }, raw: true, logging: false });

    if(user){
        const allUsers = await users.findAll({ raw: true, logging: false });
        const sendToYou = await messages.findAll({ where: { id_destinatario: user.id, id_grupo: null }, raw: true, logging: false });
        const sendByYou = await messages.findAll({ where: { id_remetente: user.id, id_grupo: null }, raw: true, logging: false });
        const sendGroup = await messages.findAll({
            include: {
                model: groups,
                required: true,//LEFT JOIN
                include: {
                    model: members,
                    required: true,
                    where: { id_usuario: user.id }
                }
            }, raw: true, logging: false
        });

        const allMessages = sendToYou.concat(sendByYou).concat(sendGroup);
        res.status(200).send(allMessages.map((message) => {
            return {
                id: message.id,
                owner: allUsers.find(u => u.id == message.id_remetente)?.nome,
                receiver: allUsers.find(u => u.id == message.id_destinatario)?.nome,
                group: message['Grupo.nome'] || undefined,
                content: message.conteudo
            }
        }));
    }else{
        res.status(401).send({ message: 'Usuário ou senha incorretos' });
    }
}

async function sendMessage(req, res){
    const { username, password, contact, content } = req.body;

    const user = await users.findOne({ where: { nome: username, senha: password }, raw: true, logging: false });
    
    if(user){
        if(contact.id && contact.type){
            try{
                const dest = contact.type == 'user' ? contact.id : null;
                const group = contact.type == 'group' ? contact.id : null;
                const message = await messages.create({ id_remetente: user.id, id_destinatario: dest, id_grupo: group, conteudo: content }, { logging: false });
                res.status(200).send({ id: message.dataValues.id });
            }catch(error){
                res.status(400).send({ message: 'Erro ao enviar mensagem' });
            }
        }else{
            res.status(400).send({ message: 'Informações de contato insuficientes' });
        }
    }else{
        res.status(401).send({ message: 'Usuário ou senha incorretos' });
    }
}

module.exports = { getMessages, sendMessage };