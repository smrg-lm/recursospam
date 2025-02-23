/**
 * Este es el archivo principal de la aplicación servidor.
 */

// Imports de commonjs.
const express = require('express');
const session = require('express-session');

// Enrutadores de la carpeta '/routes'.
const indexRouter = require('./routes/index.js');
const userRouter = require('./routes/user.js');

// Define el puerto en una constante, la manera correcta es usar variables de entorno pero no lo vamos a hacer así.
const PORT = 3000;
// Crea el objeto de la aplicación.
const app = express();


/**
 * Configuración de los valores de la aplicación.
 */

app.set('port', PORT);


// *** Aquí, luego, vamos a configurar la engine de plantillas.


/**
 * Configuración del middleware.
 */

// Agrega el middleware global.
app.use(express.urlencoded({ extended: false }));  // Procesa los datos de las peticiones POST y los pone disponibles en `req.body`.

// Middleware global de sesión.
app.use(session({
    resave: false, // No guarda el objeto en el almacén de sesiones si este no fue modificado durante el procesamiento de la petición.
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret',
    cookie: { httpOnly: false } // Para probar document.cookie
}));


/**
 * Configuración de los enrutadores.
 */

app.use("/", indexRouter);
app.use("/user", userRouter);


/**
 * Inicialización de la aplicación servidor.
 */

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
