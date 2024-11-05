const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Para servir archivos estáticos (HTML, CSS, JS)

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12005Ma#', // Cambia esto a tu contraseña
    database: 'fashionmoda',
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Endpoint para registro de usuarios
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
        db.query(query, [email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ message: 'Error al registrar usuario' });
            }
            console.log('Usuario registrado:', result);
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        });
    } catch (error) {
        console.error('Error en el proceso de registro:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Endpoint para inicio de sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ${port}');
});