
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// CONFIGURACIÓN DE CONEXIÓN A LA BASE DE DATOS
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Adrian0704',
    database: 'retro_store',
    port: 3306,
});

// RUTA DE PRUEBA PRINCIPAL
app.get('/', (req, res) => {
    res.send('Servidor backend de Retro Store funcionando');
});

// RUTA GET: OBTENER JUEGOS DESDE MYSQL
app.get('/api/juegos', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM juegos ORDER BY id ASC'
        );

        res.json(rows);

    } catch (error) {
        console.error('Error en la consulta GET:', error.message);

        res.status(500).json({
            error: 'Error al consultar la base de datos'
        });
    }
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
