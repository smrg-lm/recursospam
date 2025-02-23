const http = require('http');

// Creo el servidor
const server = http.createServer((req, res) => {
    // Utilizamos la propiedad `url` para acceder a la URL de la petición.
    console.log('URL peticionada:', req.url);
    // Indicamos que finalizamos la respuesta con una página vacía (valor por defecto).
    res.end();
});

// Ejecuto el servidor
const port = 3000;
server.listen(port);

/**
 * Abrir el navegador y escribir la dirección localhost:3000
 * Poner distintas URL sobre esa dirección.
 * Ver lo que el servidor imprime en la pantalla.
 */
