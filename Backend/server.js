const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); 

const app = express();
const PORT = 3000; 

app.use(cors()); 
app.use(bodyParser.json()); 
// Rutas
const loginRoutes = require('./routes/login'); 
const productosRoutes = require('./routes/producto'); 

// Usar las rutas
app.use('/api/login', loginRoutes);
app.use('/api/productos', productosRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
