const express = require('express');
const cors = require('cors'); // Importa el paquete CORS
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const validator = require('validator');

const app = express();
app.use(cors()); // Habilita CORS
app.use(express.json()); // Middleware para parsear JSON

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12005Ma#',
    database: 'fashionmoda'
});

// Verificando la conexión
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + connection.threadId);
});

const saltRounds = 10; // Configuración del nivel de salt de bcrypt

// Endpoint para registrar un usuario
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Validación de los datos del usuario
    if (!validator.isEmail(email)) {
        return res.status(400).send('Correo electrónico no es válido');
    }

    if (password.length < 6) {
        return res.status(400).send('La contraseña debe tener al menos 6 caracteres');
    }

    // Verificar si el correo ya está registrado
    const checkEmailQuery = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).send('Error al verificar el correo en la base de datos');
        }

        if (results.length > 0) {
            return res.status(400).send('El correo ya está registrado');
        }

        // Si el correo no está registrado, hashear la contraseña e insertar el usuario
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                return res.status(500).send('Error al procesar la contraseña');
            }

            const insertQuery = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
            connection.query(insertQuery, [email, hashedPassword], (err, results) => {
                if (err) {
                    return res.status(500).send('Error al registrar el usuario');
                }
                res.status(201).send('Usuario registrado exitosamente');
            });
        });
    });
});

// Endpoint para iniciar sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Verificación de email y contraseña
    if (!email || !password) {
        return res.status(400).send('Correo y contraseña son requeridos');
    }

    // Consultar la base de datos para obtener el usuario
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).send('Error al verificar el correo');
        }

        // Si no se encuentra al usuario
        if (results.length === 0) {
            return res.status(401).send('Usuario no encontrado');
        }

        // Comparar la contraseña ingresada con el hash en la base de datos
        const hashedPassword = results[0].password;
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error al iniciar sesión');
            }

            // Si las contraseñas coinciden, iniciar sesión
            if (isMatch) {
                res.status(200).send('Inicio de sesión exitoso');
            } else {
                res.status(401).send('Contraseña incorrecta');
            }
        });
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
