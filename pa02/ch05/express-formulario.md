# Servidor Express con formulario

De ahora en adelante, el código del servidor en el archivo `app.js` va a estar organizado en secciones de la siguiente manera:

- Imports de los módulos necesarios (siempre arriaba de todo)
- Configuración del servidor (funciones de configuración del objeto `app`)
- Funciones de respuesta a las peticiones http (GET y POST)

En la sección de importaciones importamos el módulo `express`:

```js
const express = require('express');
```

En la sección de configuración creamos el objeto `app` que representa al servidor express. Este objeto actúa de la misma manera que hicimos con *Navegador*/*World* en las escenas de p5.js, es un objeto global que contiene toda la información y los métodos del servidor. Así como teníamos los métodos para cambiar de escena y podíamos guardar los recursos que cargabamos para el sketch, en el objeto `app` tenemos todos los métodos que necesitamos para responder a las peticiones HTTP y ajustar las opciones de configuración.

Por ejemplo, en la sección de configuración del servidor agregamos el siguiente código:

```js
// Se crea el objeto servidor.
const app = express();

// Guardamos el puerto del servidor en la llave 'port' del objeto servidor.
app.set('port', 3000);
// Le decimos que escuche en el puerto que guardamos en port. Lo obtenemos con get('port').
app.listen(app.get('port'));
// Imprimimos el mensaje en la consola
console.log(`Server running on port ${app.get('port')}`);
```

En el código del ejemplo usamos el objeto `app` para definir el puerto de escucha del servidor y luego iniciamos el bucle de escucha con el método `listen` y le pasamos el número del puerto que guardamos en la llave `'port'` con el método `get`.

> Nota: Es muy importante que los métodos de configuración se llamen antes de cualquier otra función o método que dependa de ellos. Incluso es importante el orden en que se definen las opciones de configuración porque las que vienen después pueden sobreescribir a las anteriores.

Luego, en la sección de los _handlers_ (funciones de respuesta a las peticiones) vamos a utilizar el método `get` de `app` (que cambia de comportamiento según la _firma_, es decir, los argumentos que le pasemos) para definir las rutas que el cliente puede consultar con la petición GET y le devolvemos la página correspondiente:

```js
app.get('/', (req, res) => {
    res.sendFile('./view/index.html', {root: __dirname});
});

app.get('/about', (req, res) => {
    res.sendFile('./view/about.html', {root: __dirname});
});
```

En el código de ejemplo agregamos otra página dentro de la carpeta `view` que se llama `about.html` además de `index.html`. Ahora podemos navegar entre ambas tipeando la ruta en el navegador.

Al tener instalado e inicializado el módulo express, el objeto _response_ (`res`) que crea express tiene muchos métodos convenientes para consultar el estado de la request y obtener datos para que podamos procesar las peticiones de manera más fácil que con el módulo `http`. Express envuelve la funcionalidad del módulo `http` y le agrega muchas facilidades que vamos a ir viendo a medida que elaboramos el trabajo final.

El método `sendFile` del objeto _response_ recibe dos argumentos, la ruta relativa del archivo que queremos enviar y un objeto js con la configuración, dónde se encuentra el archivo, con qué condificación lo vamos a enviar y demás. Eso lo veremos después cuando sea necesario.

El método `get` de `app` también recibe varios parámetros, ya arriba lo usamos para obtener la configuración del puerto, pero ahora lo estamos usando con otra firma para definir un handler de las peticiones GET de HTML. El primer parámetro es una ruta como cadena de caracteres, el segundo parámetro es la función que va a responder a las peticiones GET que se hace a esa ruta.

El cliente también podría hacer peticiones POST cuando enviamos datos desde un formulario, para eso la aplicación express tienen el método de respuesta `post`.

Para probar la estructura del proyecto, vamos a crear la página `user.html` dentro de la carpeta `view` con el siguiente formulario dentro de `<body>:

```html
    <form action="/user" method="POST">
        <div>
            <label for="usernameElementID">Nombre</label>
            <input name="usernameData" id="usernameElementID" value="nombre" />
        </div>
        <div>
            <label for="passwordElementID">Clave</label>
            <input name="passwordData" id="passwordElementID" value="clave" />
        </div>
        <div>
            <button type="submit">Send my greetings</button>
        </div>
    </form>
```

De esta manera el cliente pueda enviar peticiones [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) a la subruta `/user` para obtener un formulario, y luego enviar peticiones POST, cuando envía los datos del formulario.

Para poder responder a estas peticiones tenemos que agregar estas dos líneas al servidor en la sección de las funciones de respuesta:

```js
app.get('/user', (req, res) => {
    res.sendFile('./view/user.html', {root: __dirname});
});

app.post('/user', (req, res) => {
    res.sendFile('./view/user.html', {root: __dirname});
});
```

Así quedan definidas las respuestas para los métodos HTTP GET y POST en la ruta `/user`. Las peticiones GET son mensajes HTTP que piden datos mientras que las peticiones POST envían datos.


## Formulario

Para poder generar una petición POST desde el navegador, por defecto las peticiones son GET, necesitamos crear un formulario en el archivo `view/user.html`.

```html
    <h1>Página de usuario/a</h1>

    <form action="/user" method="POST">
        <div>
            <label for="usernameElementID">Nombre</label>
            <input name="usernameData" id="usernameElementID" value="lucas" />
        </div>
        <div>
            <label for="passwordElementID">Clave</label>
            <input name="passwordData" id="passwordElementID" value="clave" />
        </div>
        <div>
            <button type="submit">Enviar</button>
        </div>
    </form>
```

El método HTTP de envío de los datos puede ser GET o POST, en el ejemplo está puesto `method="POST"`. Luego los datos que va a enviar cuando se presiones el botón _Enviar_ van a ser las cadenas de caracteres que cargamos en los elementos `<input>` y las vamos a poder acceder desde el servidor desde el objeto `req` del enrutador `app.post('/user', ...)`.

Pero para esto necesitamos agregarle una línea de configuración al servidor express antes de definir los enrutadores.

```js
app.use(express.urlencoded({ extended: true }));
```

Esa línea de configuración del servidor express hace que el objeto `req.body` de la petición en la función de respuesta al mensaje POST sea llenado con los datos del cuerpo del mensaje POST a través del cual podemos acceder a los nombres de los campos.

El objeto `req.body` pasa a tener los nombres de los campos de entrada que definimos en el formulario con los valores que ingresamos en esos campos para procesarlos de lado del servidor.

Nombres defindos en el formulario:

```html
<input name="usernameData" .../>
<input name="passwordData" .../>
```

> NOTA: Los nombres de los campos, el atributo `name` de `<input>` lo definimos nosotros/as, puede ser cualquier nombre. En este caso usé el nombre del campo y la palabra "data" para hacer notar que en esa variable van a aparecer los datos del campo correspondiente en el formulario.

Objeto `req.body` en el servidor con los nombres de arriba como propiedades:

```js
app.post('/user', (req, res) => {
    console.log(req.body.usernameData, req.body.passwordData);
    res.sendFile('./view/user.html', {root: __dirname});
});
```

> Nota: No confundir el _body_ del mensaje HTTP con el elemento `<body>` de HTML, se repiten las palabras pero estamos hablando de distintas formas.

> Nota: Si en vez de POST se le pasa GET al método de envío del formulario, envía la información como una petición GET pero como estas no tienen cuerpo la información está codificada en la URL. Esto no es conveniente cuando se trabaja con datos sensibles porque quedan visibles en la URL y se pueden ver desde el navegador.

Con este ejemplo ya mostramos una forma en la que el cliente le puede pasar información al servidor para que pueda ser procesada, algo que veremos en las próximas clases.


## Enlaces

https://developer.mozilla.org/es/docs/Web/HTTP
https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data
