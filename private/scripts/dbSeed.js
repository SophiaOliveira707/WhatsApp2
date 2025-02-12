const dbConnection = require('../services/dbConnection');

async function seed(){
    await dbConnection.sync({ force: true, logging: false });

    await dbConnection.models.Usuarios.create({ nome: 'Admin', senha: 'admin' });
    await dbConnection.models.Usuarios.create({ nome: 'Sophia', senha: '1234' });
    await dbConnection.models.Usuarios.create({ nome: 'Luís', senha: 'lindo' });
}

setTimeout(seed,500);//Executa após meio segundo para dar tempo os modelos carregarem