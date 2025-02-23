const express = require('express');
const router = express.Router();

/**
 * En app.js se insertan estas rutas en '/'
 * con la expresión:
 *
 * app.use("/", indexRouter);
 *
 * En este caso, las rutas de este archivo son
 * relativas a la ruta raíz, ver el caso de users.js
 * que es distinto.
 */


router.get('/', (req, res, next) => {
    res.send('Página principal de la web: ruta / (index)');
});


/**
 * About
 */

router.get('/about', (req, res, next) => {
    res.send('Información sobre la web: ruta /about');
});


/**
 * Signup
 */

router.get('/signup', (req, res, next) => {
    // Enviar el formulario.
    res.send('Creación de usuario/a: ruta /signup');
});

router.post('/signup', (req, res, next) => {
    // Recibir los datos del formulario.
});


/**
 * Login
 */

router.get('/login', (req, res, next) => {
    res.send('Formulario para login: ruta /login');
});

router.post('/login', (req, res, next) => {
    // Recibir los datos del formulario.
});


/**
 * Logout
 */

router.get('/logout', (req, res, next) => {
    res.send('Ruta para limpiar la sesión de usuario y re direccionar a home: ruta /logout');
});


module.exports = router;
