const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/db.js');
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


/**
 * Middleware para controlar el acceso a rutas que solo
 * deben estar disponibles si el usuario está logueado.
 */
function notlogged(req, res, next) {
    if(req.session.user) {
        res.redirect('/user')
    } else {
        next();
    }
}


router.get('/', (req, res, next) => {
    console.log(req.session);
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

router.get('/signup', notlogged, (req, res, next) => {
    // Enviar el formulario.
    res.sendFile('signup.html', { root: './view' });
});

router.post('/signup', notlogged, (req, res, next) => {
    const { username, email, password } = req.body;

    if (db.userExists(username)) {
        res.send('Error: el usuario ya existe');
        return
    }

    const hash = bcrypt.hashSync(password, 10);  // round = 2 ** 10;
    db.addUser(username, email, hash);
    // redirect
    res.send('El usuario se registró correctamente vaya a /login');
});


/**
 * Login
 */

router.get('/login', notlogged, (req, res, next) => {
    // Enviar el formulario.
    console.log('*** session:', req.session);
    res.sendFile('login.html', { root: './view' });
});

router.post('/login', notlogged, (req, res, next) => {
    const { username, password } = req.body;
    const ok = authenticate(username, password);

    if (ok) {
        req.session.regenerate(() => {
            req.session.user = username;
            req.session.success = `Authenticated as ${username}`;
            res.redirect('/user');
        });
    } else {
        req.session.error = 'La autenticación falló, revise su nombre de usuario y contraseña';
        res.redirect('/login');
    }
});

function authenticate(username, password) {
    // Comprobar el password y devolver verdadero o falso.
    if (!db.userExists(username)) return false
    const hash = db.getHash(username);
    const ok = bcrypt.compareSync(password, hash);
    if (ok) return true
    return false;
}


// /**
//  * Logout
//  */
// Pasada a user.js en la ruta /user/logout
// router.get('/logout', (req, res, next) => {
//     if(req.session.user) {
//         req.session.destroy(() => {
//             res.redirect('/');
//             console.log('*** session:', req.session);
//         });
//     } else {
//         res.send('No hay usuario/a logueado/a');
//     }
// });


module.exports = router;
