const http = require('http');

/**
 * HACER: Agregar datos dinámicos obtenidos del SO.
 * Por ejemplo la fecha, algún elemento aleatorio.
 */

const port = 3000;

const pg1 = `
<html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <h1>Página principal</h1>
    </body>
</html>
`

const pg2 = `
<html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <h1>Información</h1>
    </body>
</html>
`


const server = http.createServer((req, res) => {
    console.log(req.url);

    if(req.url == '/') {
        res.write(pg1);
        res.end();
        return
    }

    if(req.url == '/info') {
        res.write(pg2);
        res.end();
        return
    }
});

server.listen(port);
