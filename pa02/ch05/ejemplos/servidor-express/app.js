/**
 * Sección de imports.
 */
const express = require('express');


/**
 * Sección de creación y configuración del servidor
 */

// Se crea el objeto servidor.
const app = express();

// Configuramos el puerto del servidor.
app.set('port', 3000);
// Le decimos que escuche en el puerto que guardamos en port.
app.listen(app.get('port'));
// Imprimimos el mensaje en la consola
console.log(`Server running on port ${app.get('port')}`);

// Configuración del servidor express para que procese los
// datos que se envían con post y estén disponibles desde
// el objeto req.body de los enrutadores. Porcesa el cuerpo
// de las peticiones POST. A estos preprocesadores se les
// llama middleware.
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// LOG DE LAS REQUESTS PARA DEMOSTRACIÓN.
app.use('*', (req, res, next) => {
    console.log(req.method);
    console.log(req.originalUrl);
    console.log(req.httpVersion);
    let dict = {};
    req.rawHeaders.forEach((item, index) => {
        if(index % 2 === 0) {
            dict[item] = req.rawHeaders[index + 1];
        }
    });
    console.log(dict);
    console.log(req.body);
    next();
});


/**
 * Sección de handlers get y post
 */

app.get('/', (req, res) => {
    res.sendFile('./view/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./view/about.html', { root: __dirname });
});

app.get('/user', (req, res) => {
    res.sendFile('./view/user.html', { root: __dirname });
});

app.post('/user', (req, res) => {
    console.log('*** POST /user');
    const username = req.body.usernameData;
    const password = req.body.passwordData;
    console.log('usernameData:', username, 'passwordData:', password);
    res.sendFile('./view/user.html', {root: __dirname});
});
