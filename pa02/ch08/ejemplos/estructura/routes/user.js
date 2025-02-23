const express = require('express');
const router = express.Router();

/**
 * En app.js se insertan estas rutas en '/users'
 * con la expresión:
 *
 * app.use("/users", userRouter);
 *
 * Las rutas desde este archivo son relativas a
 * '/user', por lo tanto, '/' en este archivo
 * es '/user' en el servidor y '/profile' en este
 * archivo es '/user/profile' en el servidor.
 */


/**
 * Página principal de usuario/a.
 */

router.get('/', (req, res, next) => {
    res.send('Página de usuario/a: ruta /user');
});


/**
 * Página de perfil de usuario/a.
 */

router.get('/profile', (req, res, next) => {
    res.send('Página de configuración de usuario/a: ruta /user/profile');
});


module.exports = router;
