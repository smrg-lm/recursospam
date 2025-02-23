# Express routers y middleware

Lo que llamamos aplicaciones web se puede subdividir conceptualmente en dos partes:

- Servidor HTTP
- Aplicación Web

El _servidor HTTP_ se encarga de recibir las peticiones y enviar las respuestas a bajo nivel, procesando los datos para ser transmitidos mediante el protocolo HTTP.

La _aplicación web_ es el programa que nosotres creamos sobre el _servidor http_ para procesar la lógica de las páginas web, la base de datos, y cualquier otro servicio que provea la aplicación.

El _framework express_ se encarga de la funcionalidad básica de un servidor HTTP. Nos da las herramientas necesarias para trabajar con las peticiones y respuestas HTTP de manera simple usando funciones que ponemos para atender distintas peticiones. Estas funciones se llaman _middleware_, las podemos crear como parte de nuestra aplicación o podemos utilizar algunas que ya vienen integradas.

El funcionamiento es el siguiente: Cuando llega una petición HTTP, _express_ la dirige a la ruta especificada para ser procesada. Por ejemplo, si se recibe una petición para la ruta raíz definimos la función que la va a procesar como _callback_ utilizando el método `get`.

```javascript
app.get("/", (req, res, next) => {
    req.sendFile('index.html');
});
```

El _callback_ que le pasamos a `get` ya es parte de nuestra aplicación y puede ser tan simple como devolver un archivo HTML o requerir acciones más complejas que podemos ir procesando de manera encadenada con distintas funciones.

Por ejemplo:

```javascript
 // Middlewares
function procesar1(req, res, next) {
    console.log('1. procesando una parte de la petición');
    next();
}

function procesar2(req, res, next) {
    console.log('2. procesando otra parte de la petición');
    next();
}

function enviarhttp(req, res) {
    console.log('3. devolviendo página procesada');
    res.send('<h1>Página HTML</h1>');
}

// Enrutador
app.get('/', procesar1, procesar2, enviarhttp);
```

Los métodos de la aplicación _express_ que responden a los métodos HTTP (GET, POST, etc.) reciben como primer argumento la ruta para la cual se debe generar una respuesta y los siguiente parámetros son las funciones que van a procesar secuencialmente la petición hasta que la última devuelva algo en respuesta (`res.send`).

Nota: Las funciones enrutadoras (`get`, `post`) pueden recibir los parámetros de distintas maneras, ver la documentación, pero no las vamos a usar para no complicar las cosas.

Para poder hacer este encadenamiento, los _callback_ de los enrutadores reciben tres argumentos: `req`, los datos de la petición recibida, `res` los datos de la respuesta a enviar y `next` que es la función que se evalúa para llamar la siguiente función en la cadena de _middlewares_. De no haber más funciones en la cadena o si no se evalúa la función `next` no se sigue procesando la petición.

Es importante notar que los objetos `req` y `res` siempre son los mismos que se van pasando de función en función, los podemos ir modificando con cada función intermedia y esas modificaciones van a estar disponibles para las funciones siguientes.

El ciclo petición-respuesta de HTTP termina cuando desde una función se envía una respuesta al cliente mediante el objeto response (`res`) utilizando alguno de los siguientes métodos:

- res.download() Prompt a file to be downloaded.
- res.end() End the response process.
- res.json() Send a JSON response.
- res.jsonp() Send a JSON response with JSONP support.
- res.redirect() Redirect a request.
- res.render() Render a view template.
- res.send() Send a response of various types.
- res.sendFile() Send a file as an octet stream.
- res.sendStatus() Set the response status code and send its string representation as the response body.

Una vez enviada una respuesta dentro de la cadena de _middlewares_ ya no se puede seguir procesando la misma y tira el error `ERR_HTTP_HEADERS_SENT` si se quiere hacer desde una función posterior. Por eso, asi como para pasarle el control al siguiente _middleware_ tenemos que llamar a `next()`, para cortar la cadena y que no se llamen las siguientes funciones se debe utilizar la palabra `'route'` como argumento de a la función `next`: `next('route')`.


## Middleware a nivel de la aplicación

Venimos usando de manera práctica el méotod `use` de la aplicación _express_, por ejemplo cuando escribimos:

```javascript
app.use(express.urlencoded({ extended: false }));
```

```javascript
const opt = { extended: false }; // Opciones para urlencoded.
const mdw = express.urlencoded(opt);  // urlencode retorna otra función
app.use(mdw);  // La función se instala para todas las peticiones POST que lleguen al servidor (genera el contenido de `req.body`).
```

Al evaluar la función `urlencoded`, con sus opciones, esta devuelve otra función que se instala como _middleware_ a **nivel de aplicación** con el método `use`. Esto le agrega a nuestra aplicación la posibilidad de acceder a los datos que envían las peticiones desde el objeto `req`. El _middleware_ que devuelve `urlencoded` se llama antes de las funciones de los enrutadores (p.e. `procesar1`, `procesar2`, `procesar3` de arriba) para todas las peticiones de cualquier ruta, procesa los datos que contiene el cuerpo de las peticiones HTTP y los guarda en la propiedad `req.body`.

```javascript
app.post('/', (req, res) => {
    const { username, email, password } = req.body;  // `body` contiene los datos del formulario.
}
```


Es importante notar que el _framawork_ se basa casi exclusivamente en este diseño. Las peticiones HTTP son procesadas por una cadena de _middleware_ donde cada función recibe y va procesando los datos de los objetos request (`req`) y repsonse (`res`). Los datos de la petición se obtienen de `req` y las respuestas se envían con `res`. Y **no es más que esto**, la gracia está en todo lo que podemos hacer en el medio.


## Middleware incluido con _express_

- express.static serves static assets such as HTML files, images, and so on.
- express.json parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
- express.urlencoded parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+


## Middleware de terceras partes

Existe muchas otros _middlewares_ con utilidades importantes que no están incluidos en el paquete `express` pero se pueden instalar por separado. Por ejemplo, para manejar las cookies de las sesiones de usuario vamos a usar el paquete  `express-session` que le agrega la propiedad `session` a los objetos request de la misma manera que `urlencoded` le agrega la propiedad `body`.


# Enrutadores

Como los métodos `get`, `post`, `use` del objeto `app` de _express_ actúan a nivel de la aplicación, para poder modularizar las distintas rutas, según el tipo de función que cumplen, dentro de un sitio web existe el objeto `express.Router`. Este objeto actúa como punto de montaje se un conjunto de subdirecciones de un sitio web que luego especificamos a nivel de aplicación.

El objeto `Router` tiene los mismos métodos (`use`, `get`, `post`, etc.) que el objeto aplicación y funciona de la misma manera luego de que la aplicación le pasa el control. Además, los podemos poner en módulos a parte según la ruta.

```javascript
// Archivos controllers/user.js
const express = require('express')
const router = express.Router()

// A middleware function with no mount path. This code is executed for every request to the router.
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
})

router.get(('/user', req, res) => {
  console.log('sub ruta /user');
  res.send('<h1>Ruta de usuario</h1>);
})

exports.userRouter = router;
```

Para montar el enrutador, en el archivo que contiene el objeto de la aplicación hacemos:

```javascript
const express = require('express');
const userRouter = require('controllers/user.js);

const app = express()

app.use('/', userRouter);
```

De esta manera montamos el enrutador en la raíz (podría ser otra ruta) y desde ahí este responde a todas las sub rutas `'/user/'`.

Nota: Las rutas (path) de las URLs se comportan de la misma manera que los subdirectorios en un sistema de archivos. Ver en los ejemplos.
Nota: A las rutas (path) también se las llama _end points_ en inglés.


## Middleware a nivel de enrutador

El _middleware_ que se aplica desde los enrutadores se considera de nivel de enrutador, distintos enrutadores pueden tener distinto _middleware_ que actúe de distinta manera. Los objetos `Router` tienen los mismos métodos HTTP que el objeto aplicación, incluido el método `use` que se comporta de la misma manera y actúa antes del procesamiento de nuestra ruta específica. Esto es muy conveniente para definir funcionalidad específica de tipos de rutas específicos.


# URL Paths (bonus)

Los caminos (path) de la rutas, como en una estructura de directorios, pueden ser escritas como **cadenas de caracteres**, **patrones de caracteres** o **expresiones regulares**. Para nuestra aplicación vamos a utilizar las cadenas de caracteres comunes, pero vale la pena mensionar que existe otras posibilidades.

Las **cadenas de caracteres** son lo que venimos usando:

```javascript
// Cadenas de caracteres '/', '/about', '/login'.
app.get('/', (req, res) => { res.send('root') });
app.get('/about', (req, res) => { res.send('about') });
app.get('/login', (req, res) => { res.send('login') });
```

Los **URLs como parámetros** se procesan usando patrones de caracteres precedidos por `':'` luego de la barra `'/'` y se acceden mediante la propiedad `params` de `req`. El ejemplo siguiente acepta cualquier ruta que comience con `/user` y tenga dos sub-rutas con cualquier nombre.

```javascript
app.get('/user/:subr1/:subr2', (req, res) => { console.log(req.params) });  // { "subr1": 'cadena1', "subr2": 'cadena2' }
```

Esto es muy útil para definir URLs que dependan de valores relativos al cliente/usuario.

Nota: No confundir con los parámetros propios de las consultas URLs, por ejemplo: `www.sitio.com/user/?a=123&b=456`. Estas se acceden con la propiedad `query` del objeto `req`. Tampoco las vamos a usar pero es bueno que sepan que existen.

Las **expresiones regulares** dependen de caracteres especiales que representan partes variables de la cadena de caracteres. Por ejemplo el signo de interrogación `'?'` significa que en su lugar puede haber un o ningún caracter, y el asterisco `'*'` significa que pueden haber cero, uno o más caracteres en su lugar.

```javascript
app.get('/a?c', (req, res) => { res.send('responde a ac, abc, axc, ayc, azc, etc.') });
app.get('/a*c', (req, res) => { res.send('responde a ac, abc, axyz123c, etc.') });)
```

Hay cuatro tipos de caracteres específicos de las expresiones regulares (`?`, `+`, `*`, `()`) y si se quiere usar el caractér `$` debe ser especificado con la siguiente secuencia `([\$])`. No se hagan problema por esto.


# Enlaces

http://expressjs.com/en/guide/using-middleware.html
http://expressjs.com/en/guide/routing.html
http://expressjs.com/en/4x/api.html
