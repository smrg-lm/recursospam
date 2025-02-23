const express = require('express');

/**
 * La función `express` crea un servidor.
 * Por convención a la variable del servidor se le llama `app`.
 */
const app = express();

/**
 * Con el método `get`de la aplicación servidor se responde
 * a las peticiones GET de http en la ruta que pasamos como
 * primer parámetro. El segundo parámetro es función de respuesta
 * a la que se le llama *request handler*.
 *
 * Nota: No fue necesario importar el módulo `fs` para enviar
 * un archivo html como respuesta, eso está integrado en la
 * aplicación express.
 */
app.get('/', (req, res) => {
    res.sendFile('./static/index.html', {root: __dirname});
});


// Puerto de la aplicación servidor.
const port = 3000;

// Inicialización de la aplicación servidor.
app.listen(port);
console.log(`Server running on port ${port}`);
