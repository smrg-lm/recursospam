# Login + sesión

Vamos a tomar la estructura del proyecto vista en la sección anterior (disponible en la carpeta `estructura`) y le vamos a ir agregando los recursos que necesitamos para guardar usuarios únicos con una clave secreta. Luego vamos a agregar los recursos necesarios para generar una sesión que guarde el estado del/la usuario/a al navegar por la página.

Todo lo vamos a ir viendo y haciendo como taller. **Es importante la práctica de programación**. Partiendo de una base de código (trabajo previo), la vamos a ir modificando para agregarle funcionalidad. Para esto vamos a tener que ir revisitando las distintas secciones del código del servidor. Esto lo hacemos así porque cuando se trabaja en proyectos modularizados tenemos que tener bien claro dónde está cada cosa y cuál es su función, tenemos que conocer, y mantener en la cabeza, qué hace y cómo funciona cada uno de nuestros archivos. Luego, cuando surjan errores sabremos dónde hay que ir para corregirlos.

## Password hash

Las contraseñas no se almacenan como tales, lo que venimos haciendo está mal porque solo el/la usuario/a tiene que saber su contraseña y nadie más. Si está almacenada como texto en la base de datos, cualquiera con acceso a la base de datos puede ver la contraseñas. Para evitar esto, lo que se hace es codificar las contraseñas de manera que sea muy difícil de descodificarlas. Esto se hace mediante algoritmos criptográficos que se basan la factorización de números primos y otros condimentos como la sal.

```{note}
La multiplicación de dos números primos al azar da otro número que solo puede ser el producto de los números originales. No se conoce una forma directa (eficiente) de calcular los dos factores originales, solo se puede hacer por fuerza bruta.
```

No vamos a entrar en los detalles criptográficos, solo vamos a utilizar las funciones de encriptación sincrónicas del módulo `bcrypt` de manera muy básica. _Demás está decir que nuestro sitio no va a ser seguro para producción, estamos viendo solo cuestiones muy básicas de la estructura general de un sitio web, hay muchas cosas que pueden fallar si no se tiene cuidado_.

De este módulo vamos a usar solo dos funciones: `hashSync` y `compareSync`. La primera recibe la contraseña y la _sal_ como parámetros y nos devuelve el hash de la contraseña. El hash es lo que guardamos en la base de datos y consiste en una cadena de caracteres que contiene la contraseña encriptada según el formato de bycript. La segunda función recibe la contraseña y el hash, y se fija si la contraseña coincide con el que está almacenado en el hash. Si esta función nos devuelve verdadero es que a contraseña es correcta, para esto repite el proceso de encriptación internamente.

```{info}
Función Hash: Es una función que recibe datos de un dominio inio de entrada y los convierte en datos pertenecientes a otra dominio más específica y acotado. Por ejemplo, los datos de entrada pueden ser texto de logitud variable y la función de hash convierte ese texto en una secuencia alfanumérica única que identifica exactamente al texto de entrada pero, por ejemplo, utilizando una logitud fija de caracteres. Se utiliza en criptografía pero también sirve para muchas otras cosas, por ejemplo, para generar identificadores únicos (IDs), que se pueden utilizar como llaves de un diccionario o referencias a objetos para agilizar la búsqueda y recuperación de la información. La función de hash es reversible, teniendo el hash se puede recuperar la cadena de caracteres que la generó.
```

### Enlaces

https://www.npmjs.com/package/bcrypt

https://en.wikipedia.org/wiki/Bcrypt

https://en.wikipedia.org/wiki/Salt_(cryptography)

Seguridad, que es algo que les da curiosidad: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security


## Login y signup

Los siguientes pasos se trabajan sobre el proyecto previo llamado `estructura` que está como material de la clase anterior (copiar la carpeta en otra hubicación y renombrar).

0. Hacer `npm install` o borrar las dependencias de `package.json` e instalar los siguientes paquetes sin no funciona:

```tty
npm install express better-sqlite3
npm install nodemon -D
```

1. Agregar dos formularios `signup.html` y `login.html` en `/view`. Con los campos/nombres `username`, `email` y `password` para _signup_ y `username` y `password` para _login_. Nota: Esto luego lo vamos a reemlazar por plantillas, ahora necesitamos los formularios como páginas estáticas para probar que todo ande.

2. Enviar los formularios signup y login desde los métodos GET de `/routes/index.js`. El path es relativo al directorio raíz del proyecto `.` al principio.

```javascript
    res.sendFile('signup.html', { root: './view' });
    ...
    res.sendFile('login.html', { root: './view' });
```

3. Agregar los log en los métodos post de las rutas `/signup` y `/login`, por ejemplo, en `/signup` sería:

```javascript
    const { username, email, password } = req.body;
    console.log(username, email, password);
    res.send(`Se recibieron los datos para signup: ${username}, ${email}, ${password}`);
```

Por ahora solo reenviamos la información al navegador logueamos las cosas en la terminal del lado del servidor para comprobar que todo ande.

4. Probar que todo ande escribiendo las rutas en el navegador.

5. Agregar el paquete de encriptación para las contraseñas.

```bash
npm i bcrypt
```

6. Modificar el script de la base de datos cambiando el nombre del campo `password` por `hash`.

```sql
CREATE TABLE IF NOT EXISTS users
(
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    hash varchar(255) NOT NULL
)
```

7. Modificar los nombres de las variables en `db.js`, `password` por `hash` en la función que agrega el usuario a la base de datos.

8. Crear la lógica de registro en el método post de la ruta `/signup` en el archivo `routes/index.js`:

```javascript
const bcrypt = require('bcrypt');
const db = require('../database/db.js');

// ...

router.post('/signup', (req, res, next) => {
    const { username, email, password } = req.body;

    if (db.usernameExists(username)) {
        res.send('Error: el usuario ya existe vaya a /login');
        return
    }

    const hash = bcrypt.hashSync(password, 10);  // round = 2 ** 10;
    db.addUser(username, email, hash);
    // redirect
    res.send('El usuario se registró correctamente vaya a /login');
});
```

9. Crear la comprobación del password en post de login. Para esto vamos tener que crear una función auxiliar que se encargue de:

- Comprobar que el usuario exista en la base de datos, si no existe devuelve `false`.
- Obtener el hash del usuario de la base de datos que guardamos al crear el usuario en signup.
- Comparar el password que se envía en login devuelva el mismo hash que el que se guardó.
- Si coincide retornamos `true`, en caso contrario retornamos `false`.

Esta función va a necesitar los parámetros `username` y `password` para poder hacer la comprobación. La función authenticate se define como:

```javascript
function authenticate(username, password) {
    if (!db.userExists(username)) return false
    const hash = db.getHash(username);
    const ok = bcrypt.compareSync(password, hash);
    if (ok) return true
    else return false
}
```

Para obtener el `hash` de un usuario determinado de la base de datos tenemos que crear una función en el módulo `db.js` que obtenga este valor según el nombre de usuario:

```javascript
exports.getHash = (username) => {
    let stmt = db.prepare('SELECT hash FROM users WHERE username=?');
    return stmt.get(username).hash;
}
```

Por último hay que hacer la función de la ruta login para que compruebebe la autenticación con la función `authenticate` definida arriba. Si el login es correcto redireccionamos a la página de usuario, si falla tenemos que enviar un mensaje de error.

```javascript
router.post('/login', (req, res, next) => {
    // Recibir los datos del formulario.
    const { username, password } = req.body;
    const ok = authenticate(username, password);
    if(ok) {
        res.redirect('/user');
    } else {
        res.send('Error, usuario o constraseña incorrectos, vaya a /login');
    }
});
```

10. Hasta aquí tenemos el acceso a la base de datos y la encriptación y comprobación de la contraseña. Probar que todo ande.

## express-session

Para poder crear sesiones de usuario con _express_ vamos a utilizar el módulo `express-session` que provee la funcionalidad básica para trabajar con _cookies_ de sesión.

Las _cookies_ de sesión son información única que se envía para identificar a cada cliente en distintos agentes, simplemente guardan un identificador de sesión basado en el dominio para cada dispositivo. Pero no vamos a trabajar con sesiones concurrentes. Lo que importa es que es un identificador único de sesión para que el servidor sepa que tiene que enviar información específica.

Las _cookies_ en sí son información que se envía en el encabezado HTTP y sirven para guardar la información de las sesiones de usuarios/as, guardar preferencias de un sitio o hacer seguimiento. No vamos a entrar en detalle con esto, les dejo un enlace en castellano con algo más de información que podemos repasar en clase junto con la documentación del módulo (ver enlaces).

Dentro del servidor _express_ vamos a trabajar con el objeto `session` que se crea cuando instalamos el _middleware_ a nivel de aplicación provisto por el paquete `express-session`. El objeto `session` guarda la información de sesión para cada usuario del lado del servidor, esta información no es la _cookie_ sino propiedades que se le agregan al objeto `session` para trabajar con él. Más abajo vamos a ver que para identificar al usuario/a solo vamos a almacenar su nombre y dejar que `express-session` se encargue del resto.

### Enlaces

https://github.com/expressjs/session#readme


```{note}
Una explicación de las cookies, general e incompleta, ver recurso en internet: https://ull-esit-pl-1617.github.io/estudiar-cookies-y-sessions-en-expressjs-victor-pamela-jesus/cookies/chapter1.html
```


## Session

Los pasos a seguir son la continuación de [login](login.md) hecho sobre la estructura de rutas definida en estructura.md. Esto lo debemos hacer completando el mismo proyecto.

11. Instalar el paquete `express-session`

```bash
npm i express-session
```

12. Agregar la la configuración de la sesión en `app.js`:

```javascript
const session = require('express-session');

// Lo siguiente va en la sección de configuración del middleware a nivel de aplicación
// debajo de la parte en que se agrega urlencoded.

// Middleware global de sesión.
app.use(session({
    resave: false, // No guarda el objeto en el almacén de sesiones si este no fue modificado durante el procesamiento de la petición.
    saveUninitialized: false, // No guardar sesiones no inicializadas (nuevas y no modificadas) en el almacén.
    secret: 'shhhh, very secret'  // Clave de cifrado para firmar el ID de la sesión.
}));
```

13. Ahora, con el middleware `session()` el objeto `req` va a tener la propiedad  `req.session` que es un objeto de tipos `Session` que contiene la _cookie_ que se usa para pasar información entre el cliente y el servidor.

Probar haciendo log del objeto `req.session` en el método get de la ruta `/` del archivo `/routes/index.js`.

```javascript
router.get('/', (req, res, next) => {
    console.log('*** session:', req.session);
    res.send('ruta /');
});
```

Tiene que imprimir en la consola el objeto `Session`:

```javascript
Session {
  cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
}
```

```{note}
Recordar borrar todoso los `console.log` que se hayan utilizado para hacer pruebas de funcionamiento.
```

14. Ahora tenemos que modificar el método post de la ruta `/login` del archivo `/routes/index.js` para que cuando el usuario se haya autenticado correctamente se cree la información de la sesión que viaja con la _cookie_. Vamos a cumplir con las siguientes condiciones:

- Si la autenticación es exitosa se crea la sesión, de lo contrario podemos guardar un mensaje de error en la propiedad `error` del objeto `session` de `req`.
- Cuando creamos/regeneramos (el método se llama "regenerar" y crea o regenera) los datos de la sesión guardamos el nombre del usuario y un mensaje en la propiedad `success` del objeto `session` de `req`.
- Luego redireccionamos a la ruta de usuario `/user` que es la página que se muestra luego del login.

Nota: Esto se hace con el método `req.session.regenerate()` que es _asincrónico_, por eso hay que hacerlo dentro de un _callback_ que se le pasa como argumento.

La modificación de la ruta `/login` queda de la siguiente manera:

```javascript
router.post('/login', (req, res, next) => {
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
```

15. Desde el archivo `/routes/user.js` e pueden comprobar los valores de `req.session` haciendo `console.log('*** req.session:', req.session);` en el método get de `/` (raíz del enrutador) y, en el archivo `/routes/index.js` haciendo `console.log('*** session:', req.session);` en el método get de `/login` que es para cada caso donde se redirecciona al cliente en caso de éxito o error.


16. De la misma manera que creamos/regeneramos el objeto `session` cuando un usuario se loguea tenemos que borrar los datos de la sesión cuando se desloguea. Para esto creamos la ruta `/logut` con el método get en `/routes/index.js`. A esta ruta se va a redireccionar al usuario cuando presiones el botón de logout y es la que se va a encargar de borrar el objeto `session`. Esto se hace con el método `destroy` del objeto `session`.

Nota: Al igual que `regenerate`, `destroy` es asincrónico y por lo tanto lo que se deba hacer luego de destruida la sesión, en este caso redireccionar al usuario a la página principal, debe hacerse en el _callback_ que se pasa como argumento.

```javascript
router.get('/logout', (req, res) => {
    // Destruye los datos de la sesión que se regeneran para la próxima petición.
    // El usuario queda deslogueado y se lo redirecciona a la página principal.
    req.session.destroy(() => {
        res.redirect('/');
    });
});
```

16. Lo último que falta es un mecanismo para restringir la página privada de la sesión de les usuaries y hacer las redirecciones en caso de que se quiera acceder a las rutas sin haberse registrado.

Para esto vamos a crear un _middleware_ que vamos a agregar a las rutas restringidas de `/user` para que se ejecute **antes** de la función que procesa las peticiones en esas rutas. Este nuevo _middleware_ primero se va a fijar que esté alguno de los datos de registro de la sesión y en base a eso le va a pasar el control a la función que procesa la request en caso de que el usuario esté registrado, de lo contrario va a redireccionar a una ruta pública.

Para comprobar si el usuario está registrado vamos a usar la propiedad `user` que le agregamos al objeto `session` cuando regeneramos la sesión en `/login`. Dentro de `/routes/user.js` vamos a definir la siguiente función para el módulo:

```javascript
function restricted(req, res, next) {
    if (req.session.user) {
        // Le pasa el control al próximo middleware que muestra la página de usuario.
        next();
    } else {
        // Guarda un mensaje de error en la sesión y redirecciona a la ruta /login que es pública.
        // Puede ser otra ruta como _home_ u otra página de error.
        // No llama a next() por lo que genera una respuesta y corta la cadena de middlewares.
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}
```

La función de arriba se declara en `/routes/user.js` luego de la sección de importaciones.

17. En las rutas del módulo user vamos a agregar el _middleware_ que definimos arriba. Tenemos dos opciones, muestro ambas pero vamos a utilizar la segunda.

**Primera**: Recuerden que a los métodos HTTP de los enrutadores se les puede pasar la ruta y luego varias funciones que se llama una a continuación de otra con `next()`, si no se llama a `next()` el _middleware_ corta al cadena:

```javascript
router.get('/', restricted, callbackUser);
router.get('/profile', restricted, callbackProfile);
```

Nuestro proyecto, si hicieramos esto, queda así:

```javascript
// Para /user
router.get('/', restricted, (req, res, next) => {
    console.log('*** session:', req.session);
    res.send('Página de usuario/a: ruta /user');
});

// Para /user/profile.
router.get('/profile', restricted, (req, res, next) => {
    res.send('Página de configuración de usuario/a: ruta /user/profile');
});
```

**Segunda**: Pero como todas las rutas del enrutador de usuario van a ser restringidas podemos utilizar el método `use` a nivel de enrutador y así nos ahorramos tener que agregar una función extra a cada nueva ruta que queramos agregar. Entonces, gracias a la arquitectura de `express` podemos instalar el _callback_ inmediatamente después de declarada la función `restrict`:

```js
function restricted(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

router.use(restrict);

// ...Luego vienen get / y get /profile que ya estaban...
```

18. Comprobar que todo ande con las redirecciones y los `console.log` que habíamos agregado en `/user` y `/login`. Usar las rutas `/login`, `/signup` para registrarse y `/logout` para salir, luego probar la ruta `/user` estando logueado o no, ver que el navegador muestre las páginas que le dijimos en cada caso y lo que se imprime en la terminal del servidor.


## Actividad

1. En `/routes/index.js`, agregar un _middleware_ (similar a como hicimos con `restricted` arriba) pero **solo** para los métodos get y post de las rutas `/login` y `/signup` que redireccione a la página de usuario si se quiere acceder cuando el usuario está logueado.

Para esto solo necesitamos una función que compruebe si la propiedad `user` del objeto `req.session` está definida. Si está definida redireccionamos a la ruta `/user `, de lo contrario se llama a la función `next()` para que continúe la cadena de _middlewares_. Ayuda: Esta función no se puede instalar con `use`, hay que utilizar la opción primera del punto 17.

2. En `/logout` se podría agregar una comprobación también si no hay usuario/a logueado/a y redireccionar. Por seguridad siempre hay que contemplar que alguien puede tipear cualquier dirección en el servidor y las rutas deben estar protegidas, pero no vamos a hacer hincapié en esto salvo que sea necesario. Una solución puede ser pasar la ruta `/logout` con su _callback_ a `/user/logout` ya que el _middleware_ `restricted` de ese enrutador siempre comprueba que el usuario esté logueado.

3. Comprobar que todas las rutas funcionen con todos los métodos como corresponde tanto con el/la usuario/a logueado/da como no logueado/da.

```
/
/about
/login (con get y post)
/signup (con get y post)
/user
/user/profile
/user/logout (para desloguear)
```

4. Borrar el archivo de la base de datos (`user.db`) para volver a empezar las pruebas de cero. Ver la consola del servidor y comprobar que todos los `console.log` funcionen correctamente a cada paso a cada petición para cada dirección (home, about, signup, login, user). Luego volver a comentar los `console.log` para que no quede la terminal llena de mensajes. Estos logs los creamos solo para ver cosas y comprobar que cada ruta ande, si algo falla los volvemos a poner de a uno según la ruta que queramos ver.
