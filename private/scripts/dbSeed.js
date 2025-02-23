const dbConnection = require('../services/dbConnection');
const users = dbConnection.models.Usuarios;
const groups = dbConnection.models.Grupos;
const members = dbConnection.models.Membros;

async function seed(){
    //Sincroniza as tabelas do banco de dados de forma forçada, apagando todos os dados anteriores
    await dbConnection.sync({ force: true, logging: false });

    //Adiciona alguns valores padrões no novo banco de dados
    await users.create({ nome: 'Admin', senha: 'admin' });
    await users.create({ nome: 'Sophia', senha: '1234' });
    await users.create({ nome: 'Luís', senha: 'lindo' });
    
    await groups.create({ nome: 'FireFox' });
    
    await members.create({ id_usuario: 2, id_grupo: 1 });
    await members.create({ id_usuario: 3, id_grupo: 1 });
}

setTimeout(seed,500);//Executa após meio segundo para dar tempo os modelos carregarem