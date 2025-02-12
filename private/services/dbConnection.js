const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname,'..','..','.env') });

const dbConnection = new Sequelize({
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.HOST,
    port: process.env.PGPORT,
    dialect: 'postgres'
});

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

dbConnection.sync({ force: false, logging: false });

module.exports = dbConnection;