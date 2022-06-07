const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const stringConnection = process.env.DATABASE_URL;

const client = new MongoClient(stringConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


let baseDeDatos;

const conectarDB = (callback) => {
    client.connect((err, db) => {
        if (err) {
            console.error("error al conectar a la base de datos");
        }
        baseDeDatos = db.db('poliChatbot')
        console.log("conexión existosa");
        return callback();
    });
};

const  getDB = () => {
    return baseDeDatos;
}

// Exporta función de conexión de la base de datos
module.exports = { conectarDB, getDB };