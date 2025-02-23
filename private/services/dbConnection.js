const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

//Configura o arquivo .env (que tem as variáveis do Postgres), pode ser acessado com "process.env"
dotenv.config({ path: path.join(__dirname,'..','..','.env') });

//Cria uma conexão com o banco de dados usando as variáveis do .env
const dbConnection = new Sequelize({
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.HOST,
    port: process.env.PGPORT,
    dialect: 'postgres'
});

//Define as tabelas do banco de dados
const usuarios = dbConnection.define('Usuarios',{
    nome: { type: DataTypes.STRING(25), allowNull: false },
    senha: { type: DataTypes.STRING(25), allowNull: false }
},{ timestamps: false });

const grupos = dbConnection.define('Grupos',{
    nome: { type: DataTypes.STRING(25), allowNull: false }
},{ timestamps: false });

const mensagens = dbConnection.define('Mensagens',{
    id_remetente: { type: DataTypes.INTEGER, references: { key: 'id', model: usuarios }, allowNull: false },
    id_destinatario: { type: DataTypes.INTEGER, references: { key: 'id', model: usuarios } },
    id_grupo: { type: DataTypes.INTEGER, references: { key: 'id', model: grupos } },
    conteudo: { type: DataTypes.STRING(280), allowNull: false }
},{ timestamps: false });

const membros = dbConnection.define('Membros',{
    id_usuario: { type: DataTypes.INTEGER, references: { key: 'id', model: usuarios }, allowNull: false },
    id_grupo: { type: DataTypes.INTEGER, references: {key: 'id', model: grupos}, allowNull: false }
},{ timestamps: false });

//Um usuário tem muitas mensagens e uma mensagem pertence a um usuário (envio e recebimento)
usuarios.hasMany(mensagens, { foreignKey: 'id_remetente' });
usuarios.hasMany(mensagens, { foreignKey: 'id_destinatario' });
mensagens.belongsTo(usuarios, { foreignKey: 'id_remetente' });
mensagens.belongsTo(usuarios, { foreignKey: 'id_destinatario' });

//Um usuário tem várias participações como membro e essa participação pertence a um usuário
usuarios.hasMany(membros, { foreignKey: 'id_usuario' });
membros.belongsTo(usuarios, { foreignKey: 'id_usuario' });

//Um grupo tem muitos membros e um membro pertence a um grupo
grupos.hasMany(membros, { foreignKey: 'id_grupo' });
membros.belongsTo(grupos, { foreignKey: 'id_grupo' });

//Um grupo tem muitas mensagens e uma mensagem pertence a um grupo
grupos.hasMany(mensagens, { foreignKey: 'id_grupo' });
mensagens.belongsTo(grupos, { foreignKey: 'id_grupo' });

//Sincroniza as tabelas definidas com o banco de dados, garantindo que todas existam
dbConnection.sync({ force: false, logging: false });

module.exports = dbConnection;