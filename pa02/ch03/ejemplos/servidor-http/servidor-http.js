const http = require('http');
const fs = require('fs');

/**
 * El método `http.createServer` recibe una función
 * como primer argumento que, a su vez, recibe dos
 * agrumentos (req y res) cuando es llamada por la
 * API del módulo html.
 *
 * req es un objeto http.IncomingMessage.
 * res es un objeto http.ServerResponse.
 *
 * Estos objetos vienen dados, se usan para obtener
 * y pasar información a la API interna. Por ejemplo,
 * del objeto http.IncomingMessage podemos ver la url
 * que se pidió y el método `pipe` de fs.ReadStream
 * recibe como argumento al objeto res (response) donde
 * se van cargando los datos que se envía al cliente.
 */
const server = http.createServer((req, res) => {
    // Devuelve un objeto fs.ReadStream para poder enviar el archivo.
    const read = fs.createReadStream('./index.html');
    // El método pip de fs.ReadStream envía los datos al cliente a medida que se leen del disco y termina la respuesta.
    read.pipe(res);
});

const port = 3000;
server.listen(port);
console.log(`Server running on port ${port}`);
