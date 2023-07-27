const express = require('express');
const db = require('./DB/mongodb');
const Joi = require('joi');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Definir el esquema de validación
const contactoSchema = Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    telefono: Joi.string().required().length(10),
});

// Define Routes
app.get('/', async (req, res) => {
    const contactos = await db.getDB().collection('contacts').find({}).toArray();
    res.json(contactos);
});

app.post('/', async (req, res) => {
    // Validar la entrada
    const { error } = contactoSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { nombre, apellido, telefono } = req.body;
    const nuevoContacto = { nombre, apellido, telefono };
    await db.getDB().collection('contacts').insertOne(nuevoContacto);
    res.json(nuevoContacto);
});

db.connect().then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}).catch((err) => console.log(err));