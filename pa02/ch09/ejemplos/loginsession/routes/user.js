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
 * Middleware para restringir el acceso a las páginas
 * cuando el usuario no está logueado. Se aplica en cadena
 * en las rutas que lo requieran dentro la sección /user.
 */

function restricted(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

router.use(restricted);

/**
 * Página principal de usuario/a.
 */

router.get('/', (req, res, next) => {
    console.log('*** /user req.session:', req.session);
    console.log('*** /user req.session.cookie:', req.session.cookie);
    console.log('*** /user req.sesssion.id:', req.session.id);
    res.send('Página de usuario/a: ruta /user');
});


/**
 * Página de perfil de usuario/a.
 */

router.get('/profile', (req, res, next) => {
    console.log('*** /profile session:', req.session);
    res.send('Página de configuración de usuario/a: ruta /user/profile');
});


/**
 * Logout de usuario/a.
 */

router.get('/logout', (req, res, next) => {
    if(req.session.user) {
        req.session.destroy(() => {
            res.redirect('/');
            console.log('*** /logout session:', req.session);
        });
    }
});


module.exports = router;
