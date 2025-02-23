const express = require('express');
const userRouter = require('./routes/user.js');

/**
 * Configurar la aplicación.
 */

const PORT = 3000;
const app = express();
app.set('port', PORT);

app.use(express.urlencoded({ extended: false }));  // Procesa los datos de las peticiones POST y los pone disponibles en `req.body`.


/**
 * Middleware.
 */

function procesar1(req, res, next) {
    req.lalala = 'lalala';
    console.log('1. procesando una parte de la petición');
    next();
}

function procesar2(req, res, next) {
    console.log('2. procesando otra parte de la petición', req.lalala);
    next();
}

function enviarhttp(req, res) {
    console.log('3. devolviendo página procesada');
    res.send('<h1>Página HTML</h1>');
}

/**
 * Enrutador de la aplicación.
 */

app.get('/', procesar1, procesar2, enviarhttp);

/**
 * Enrutador de user montado en home.
 */

app.use('/', userRouter);

/**
 * Inicialización de la aplicación servidor.
 */
            
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
