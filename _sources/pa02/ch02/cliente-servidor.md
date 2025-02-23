# Servidor HTTP básico

Descarga la [Carpeta de Ejemplos](./ejemplos.zip)


## Introducción

En los últimos años el mundo de los desarrolladores de tecnologías para internet ha cambiado vertiginosamente, de hecho todo el tiempo hay que actualizarse para estar al día de los nuevos desarrollos.

Páginas, servidores, lenguajes, publicidad y todo lo que tiene que ver con la web ha cambiado de paradigma varias veces, pero en general podemos dividir muchas de estas tecnologías en dos grandes ramas según quién haga el procesamiento: las que maneja el cliente/usuario desde su máquina/navegador y las que son realizadas por los servidores.

Además podemos hacer una división referida al contenido que tienen las páginas, las cuales podemos considerar de orden **estático o dinámico**.

---

Actualmente podemos trabajar con un **conjunto de lenguajes estandarizados** que nos permiten desarrollar nuestras páginas en estos ámbitos (HTML5, CSS, JavaScript, SQL).

Estos lenguajes pueden trabajar con **información estática y/o dinámica**, es decir que pueden o no actualizar de forma automatizada la información o contenido que muestran.

Los lenguajes que permiten trabajar con webs dinámicas permiten cambiar el contenido de forma simple y preestablecida, como así también generar procesamientos en los datos que den lugar a nuevas formas de mostrar información.

Estas acciones se realizan en base a peticiones a diferentes servicios alojados en servidores, los cuales en general se basan en consultas a diferentes **bases de datos**.


---

## Introducción a la arquitectura cliente-servidor

Llamaremos **servidores**, de servicios o bases de datos, a **computadoras remotas**, conectadas a una red, mediante las cuales una aplicación cliente ("user-agent" es el término técnico) puede acceder para obtener datos e información que luego visualizará de forma local, generando un retroalimentación entre este cliente y el servidor.

[IMAGEN]

---

El contenido dinámico se puede generar tanto del lado del cliente como del servidor.

Las webs estáticas se desarrollan con HTML y CSS como mucho para definir estilos visuales.

El contenido dinámico **del lado del cliente** se desarrolla en base a lenguajes como JavaScript que se ejecutan desde el navegador y mediante programas instalados en la máquina del cliente.

El contenido dinámico **del lado del servidor** se realiza con lenguajes como PHP, Python, ASP, PERL, etc., los cuales reciben **peticiones**, procesan los datos y devuelven una respuesta al cliente.

[IMAGEN]

Estos últimos permiten la utilización de bases de datos, scripts de procesamiento, streaming, etc., con casi cualquier información, lo que permite que la actualización y cantidad de procesos a realizar sea muy alta (escalabilidad).

---

## Petición estática

Ahora evaluaremos cómo se hace una petición de una página web estática, basada en HTML.

El tipo de página web más simple está desarrollado bajo un concepto totalmente estático, de hecho está basado en su gran mayoría por texto plano y escrito en HTML.

A grandes rasgos, cuando llamamos (desde un navegador) a una página (formato HTML) que está alojada en un servidor pasa lo siguiente:

1. Nuestra computadora, mediante un navegador web, solicita al servidor una página a través de internet.
2. El servidor envía los datos en formato de texto.
3. El navegador recibe esos datos, interpreta la página web que envió el servidor y nos la muestra según la resolución de monitor que tengamos, la preferencias del usuario y algún que otro factor.

---

El esquema general sería:

[IMAGEN]

---

Fácilmente nos podemos dar cuenta que las webs estáticas no nos permiten una interactividad muy elaborada con la información que pueda ir guardando el usuario y, de hecho, usar HTML solo permite cambiar visualmente algunas cosas.

Si quisieramos, por ejemplo, que la página cambie algo deberiamos entrar al servidor, cambiar el código HTML y volverlo a subir el código actualizado lo que torna poco práctico el mantenimiento de una simple página.

De esa manera, si quisiéramos que un usuario cargue datos de forma remota y después pueda realizar visualizaciones de esos datos, no podríamos hacerlo de esta forma.

A raíz de esto aparecieron algunas tecnologías que hacen a la página más "usable" y agregan algunas características a la base HTML.

---

## Petición dinámica

Muchas de las mejoras que se le ha hecho a HTML se debieron a las tecnologías que se aplican del lado del cliente, es decir las que se descargan junto con la página web solicitada y se ejecutan en nuestra máquina directamente (consumiendo nuestros recursos).

Lenguajes como JavaScript, las applets de Java (obsoletos), CSS (Cascading Style Sheets – hojas de estilo en cascada), las animaciones Flash (obsoleto) y otras, permiten un grado de interactividad más potente y que, al fin y al cabo, sirven para dotar a las páginas de una herramienta más para mostrar su contenido de una forma más fácil y atractiva.

Estos permiten cosas como responder al movimiento del mouse, o a la presión de alguna tecla en particular, películas interactivas mediante animaciones, etc.

---

Estas tecnologías que pueden ser muy llamativas y que permiten desarrollar diseños más efectivos e imaginativos, dependen sin embargo de las características del navegador (hoy en día bastante estandarizado y solucionado por las distintas librerías de programación).

Además las tecnologías del lado cliente no pueden rescatar información de servidores, por que su accionar es puramente local.

Esto los imposibilita a recuperar información de base de datos o de servicios, las cuales son fundamentales en este momento de evolución y uso de la web.

---

Los lenguajes que se utilizan del lado del servidor son invisibles para los clientes.

Las páginas utilizan scripts o plantillas para generar las páginas HTML enviar.

Según la tecnología la sintaxis puede variar pero el principio siempre el de generar el contenido de la página web requerida por el cliente según los datos enviados por el cliente.

---

Los pasos para el cargado de una web con este tipo de tecnología cambian sensiblemente:

	1. Nuestra computadora, mediante un navegador, solicita una página de internet alojada en un servidor remoto.
	2. El servidor comprueba si la página solicitada contiene algún script del lado del servidor (JavaScript, PHP, ASP, Python, etc.).
	3. El servidor ejecuta los scripts y el resultado de estos es añadido a la página HTML solicitada.
	4. El navegador recibe estos datos en formato texto, interpreta la página web enviada y la muestra según la configuración local.

Los lenguajes del lado servidor necesitan un programa que interprete el código de los script.

---

El esquema general sería:

[IMAGEN]


## Servidor estático utilizando Node.js

A continuación vamos a desarrollar y servidor muy simple con Node.js que devuelve páginas estáticas. La estrucutra del proyecto la creamos manualmente en una carpeta llamada `servidor-http` que contien dos archivos, una página HTML y un script en JavaScript. Ambos archivos se llaman `index.html` e `index.js` por convención:

```tty
servidor-http/
  index.html
  index.js
```

El archivo `index.html` contiene una página HTML básica que podemos crear en `vscode` escribiendo `html:5` y tocando enter en el editor. Le agregamos el título y algo de contenído mínimo en `body` para poder visualizarla:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Estática</title>
</head>
<body>
    <h1>Página Estática</h1>
    <p>Texto de la página estática.</p>
</body>
</html>
```

Ahora vamos con el programa en JavaScript. Como la programación necesaria para interactuar con los sockets y el protocolo de red es relativamente compleja, requiere de funcionalidades de más bajo nivel para interactuar con el sistema operativo, vamos a utilizar un módulo integrado de Node.js que implementa por nosotros/as toda la lógica necesaria para crear las conexiones.

El módulo que vamos a utilizar se llama `'http'`. Este módulo contiene objetos y funciones necesarias para implementar clientes y servidores HTTP. Por convención lo vamos a importar en una constante en minúsculas con su mismo nombre:

```js
const http = require('http');
```

De este módulo vamos a utilizar la función `http.createServer`. Esta función retorna un objeto que crea un servidor HTTP, representado por el objeto `http.Server`, listo para usar.

La función `createServer` recibe una función de respuesta (callback) como primer argumento que, a su vez, recibe dos agrumentos `req` y `res`. Se denimina función de respuesta porque es llama automáticamente cada vez que el servidor recibe una petición e implementa la lógica de respuesta. La estructura es la siguiente:

```js
const server = http.createServer((req, res) => { });
```

Guardamos el objeto `http.Server` en la constante `server` que creamos para tal fin. Este objeto lo guardamos en una constante porque debe ser único y va a estar presente hasta el final de la ejecución del programa. A su vez, le pasamos la función flecha `(req, res) => { }` como argumento a la función `createServer`. Para que nuestro servidor pueda recibir y responder a peticiones HTTP debemos implementar la lógica necesaria dentro de la función flecha utilizando los parámetros `req` y `res`.

El parámetro `req` recibe como argumento un objeto `http.IncomingMessage` que representa la petición HTTP. El parámetro `res` es un objeto `http.ServerResponse` que representa la respuesta que se le va a dar a la petición.

Para completar el ciclo de vida del programa nos falta definir un puerto de escucha en el sistema operativo e iniciar el servidor. Esto los vamos a hacer con solo dos líneas de código más:

```js
const port = 3000;
server.listen(port);
```

El método `listen` del objeto `server` recibe un número de puerto y comienza un ciclo infinito. Cada vez que llegue una petición HTTP va a llamar a nuestra función de respuesta.

Pero primero vamos a completar el ciclo de vida del programa servidor para ver que todo esté funcionando. Para esto vamos completar la función de respuesta usando el objeto `req` para hacer un log de la URL que se pidió desde el navegador en la consola y respondiendo con una página vacía.

```js
const server = http.createServer((req, res) => {
    // Utilizamos la propiedad `url` para acceder a la URL de la petición.
    console.log('URL peticionada:', req.url);
    // Indicamos que finalizamos la respuesta con una página vacía (valor por defecto).
    res.end();
});
```

Probamos el programa para ver que funcione, en la consola ejecutamos nuestro script con el comando `node`:

```tty
node index.js
```

Y en el navegador peticionamos la URL del host local en el puerto de nuestro servidor: `http://localhost:3000/`.

Preguntas:

- ¿Qué pasa si no utilizamos `end` en la respuesta?
- ¿Qué acciones suceden del lado del cliente (navegador) o del servidor (consola)?
- ¿Cómo hacemos para finalizar el programa?

Para completar el programa vamos a hacer que nuestro servidor responda a cualquier petición HTTP con el contenido del archivo `index.html` que creamos al principio. Para poder enviar el archivo tenemos que leerlo del disco rígido y para eso necesitamos el módulo llamado `'fs'` (por file system). Debajo de la importación del módulo `http` agregamos este nuevo módulo:

```js
const http = require('http');
const fs = require('fs');  // Agregamos el módulo en la secciónd e importaciones.
```

Este módulo nos proporciona una función que nos permite hacer un streaming del conotenido de un archivo como respuesta a una petición HTTP un objeto `fs.ReadStream` y su función `pipe` específicamente diseñada para este tipo de respuestas.

Para probar, reemplazamos el contenido de nuestra función de respuesta con el siguiente código:

```js
const server = http.createServer((req, res) => {  // request y response.
    const read = fs.createReadStream('./index.html');  // Devuelve un objeto fs.ReadStream
    read.pipe(res);  // El método pipe de fs.ReadStream envía los datos al cliente a medida que se leen del disco y termina la respuesta.
});
```

Como no nos interesa analizar los datos de la petición `req` vamos a dejar el objeto sin usar. No pasa nada si no se usa la información de la petición.

El ejemplo completo debe quedar de la siguiente manera:

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const read = fs.createReadStream('./index.html');
    read.pipe(res);
});

const port = 3000;
server.listen(port);
```

Probar en el navegador actualizando la página `http://localhost:3000/` y ver que esta se cargue correctamente.

Preguntas:

- Visualizar el contenido HTML desde el inspector del navegador ¿Es correcta?
- ¿Que sucede en la consola? (se puede agregar un log que indique que el servidor está corriendo).
- ¿Cómo hacemos para finalizar el programa?


## Servidor dinámicos utilizando Node.js

**EJEMPLO EN CARPETA, FALTA COMPLETAR TEXTO**


## Trabajo a realizar de ahora en más

Para el desarrollo de esta segunda parte trabajaremos la arquitectura cliente-servidor de manera muy simple.

La idea es poder crear un servidor local (en nuestra computadora) que trabaje con Node.js y las librerías CommonJS.

Para eso trabajaremos con distintas herramientas que permiten crear aplicaciones simples del lado del servidor.

Este tipo de servidores, de **desarrollo**, sirven para trabajar sobre un proyecto que luego podrá ser desplegado en un servidor remoto, de **producción**.


## Enlaces

https://nodejs.org/api/synopsis.html

https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module
