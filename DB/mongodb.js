// Connection MongoDB
// =============================================================
// Importar la librería de MongoDB
const { MongoClient } = require('mongodb');

// Importar la librería de dotenv
require('dotenv').config();

// Usar la variable de entorno para la cadena de conexión
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let _db;

const connect = async () => {
    try {
        await client.connect();
        _db = client.db();
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const getDB = () => _db;

module.exports = { connect, getDB };