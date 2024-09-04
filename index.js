const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

app.use(cors());
const app = express();
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con MySQL:', err);
        return;
    }
    console.log('Coneccion a MySQL');
});

// Endpoint para agendar una cita
app.post('/agendar_cita', (req, res) => {
    const { nombre, especialidad, doctor, fecha, hora } = req.body;

    const sql = 'INSERT INTO agendar_cita (nombre, especialidad, doctor, fecha, hora) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, especialidad, doctor, fecha, hora], (err, result) => {
        if (err) {
            console.error('Error al guardar:', err);
            return res.status(500).send('Error al guarrar cita');
        }
        res.status(201).send('Cita agendada satisfactoriamente');
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
