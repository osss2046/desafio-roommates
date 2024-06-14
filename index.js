const express = require('express');
const app = express();
const path = require('path');
const roommateRoutes = require('./routes/roommates');
const gastoRoutes = require('./routes/gastos');

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/roommates', roommateRoutes);
app.use('/gastos', gastoRoutes);

// Ruta para el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
