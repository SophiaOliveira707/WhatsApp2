const { Sequelize, DataTypes } = require('sequelize');

const dbConnection = new Sequelize({
    username: 'postgres',
    password: 'pabd',
    database: 'whatsapp2',
    host: 'localhost',
    port: 5433,
    dialect: 'postgres'
});

async function iniciarBancoDeDados(){
    const usuarios = dbConnection.define('Usuarios',{
        nome: { type: DataTypes.STRING(25), allowNull: false },
        senha: { type: DataTypes.STRING(25), allowNull: false }
    },{ timestamps: false });

    const mensagens = dbConnection.define('Mensagens',{
        id_remetente: { type: DataTypes.INTEGER, references: { key: 'id', model: usuarios }, allowNull: false },
        id_destinatario: { type: DataTypes.INTEGER, references: { key: 'id', model: usuarios }, allowNull: false },
        mensagem: { type: DataTypes.STRING(280), allowNull: false }
    },{ timestamps: false });

    const grupos = dbConnection.define('Grupos',{
        nome: { type: DataTypes.STRING(25), allowNull: false }
    },{ timestamps: false });

    const membros = dbConnection.define('Membros',{
        id_usuario: { type: DataTypes.INTEGER, references: { key: 'id', model: usuarios }, allowNull: false },
        id_grupo: { type: DataTypes.INTEGER, references: {key: 'id', model: grupos}, allowNull: false }
    },{ timestamps: false });

    const mensagensGrupos = dbConnection.define('MensagensGrupos',{
        id_remetente: { type: DataTypes.INTEGER, references: { key: 'id', model: usuarios }, allowNull: false },
        id_grupo: { type: DataTypes.INTEGER, references: {key: 'id', model: grupos}, allowNull: false },
        mensagem: { type: DataTypes.STRING(280), allowNull: false }
    },{ timestamps: false });

    await dbConnection.sync({ force: true });
    
    await usuarios.create({ nome: 'Admin', senha: 'admin' });
    await usuarios.create({ nome: 'Sophia', senha: '1234' });
    await usuarios.create({ nome: 'Luís', senha: 'lindo' });
}

iniciarBancoDeDados();

module.exports = dbConnection;