# Entorno de desarrollo Node.js + Express

Como vimos anteriormente, es posible crear un servidor mínimo con el módulo `http` que devuelve una página web estática. Esto se hizo con el siguiente código:

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const read = fs.createReadStream('./index.html');
    read.pipe(res);
});

const port = 3000;
server.listen(port);
console.log(`Server running on port ${port}`);
```

Pero las aplicaciones web se vuelven un tanto complejas cuando queremos agregar más páginas y funcionalidades. Debido a esto existen otras librerías/frameworks, construidas sobre los módulos básicos de Node.js, que ya tienen resulta la funcionalidad de muchos tipos de sitios web y facilitan el desarrollo al no tener que estar escribiendo todo desde cero usando solo los módulos integrados.

Para poder trabajar con estas librerías, primero tenemos que aprender cómo funcionan los proyectos y los módulos necesarios en Node.js.

## Comando npm

El ecosistema de Node.js no termina con las librerías integradas. Desde sus comienzos se pensó como algo modular para que otros/as desarrolladores/as pudieran extender su funcionalidad. Una de las innovaciones de Node.js es que incorpora un gestor de módulos de terceros, similar al comando `pip` y _PyPI_ en Python, y un gestor de proyectos Node.js.

Los módulos creados por terceras partes se pueden investigar en la siguiente página:

[npmjs.com](www.npmjs.com)

Para poder instalar módulos de terceros debemos utilizar el comando `npm` que sería una suerte de acórnimo de *node package manager* no reconocido. Este comando se instala por defecto con Node.js, lo podemos comprobar en una terminal:

```bash
npm --version
```

Para instalar un paquete se utiliza la opción install:

```bash
npm install nombre-del-paquete
npm i nombre-del-paquete  # La opción i es alias de install.
```

Nota: para obtener ayuda sobre los comandos se puede ejecutar:

```bash
npm help  # Información general del comando.
npm help install  # Página de manual con la información sobre la instalación de paqutes, se sale con la tecla q.
npm help init  # Página de manual con la información sobre la creación de proyectos como paqutes, se sale con la tecla q.
```

Por ejemplo, si creamos una carpeta vacía llamada `servidor-express` y dentro de ella ejecutamos el siguiente comando:

```bash
npm i express
```

Va a instalar la librería `express` y para ello crea una estructura de directorios y archivos:

```bash
node_modules
package.json
package-lock.json
```

La primera entrada es una carpeta que se llama `node_modules` y contiene el módulo `express` y todos los módulos de los que este depende. Si miran en la carpeta van a ver que son unos cuantos.

Luego crea otros dos archivos de tipo JSON. El primero es `package-lock.json` que guarda el nombre, la versión y demás información de todas las librerías instaladas en `node_modules`, las que instalamos explícitamente y sus dependencias. Esto le sirve como información a `npm` para que cuando se actualicen los módulos o se instalen nuevos el estado de la instalación sea consistente.

El segundo archivo tipo JSON es `package.json` que contiene la información del paquete que instalamos con `npm` en el directorio actual, en este caso solo `express`. Esto es porque el comando `npm` siempre considera al directorio actual como el directorio del proyecto de programación, por defecto, los paquetes no se instalan de manera global en la computadora.

Los archivos JSON que crea y la estructura de directorios no se deben modificar, son utilizados y actualizados por `npm`. Los archivos `package.json` y `package-lock.json` incluso sirver para volver a instalar las dependencias si por razones de espacio necesitamos borrar la carpeta `node_modules` porque es muy pesada. Por ejemplo, si borramos la carpeta `node_modules` y ejecutamos el comando

```bash
npm i  # Sin opciones.
```

vuelve a crear el directorio `node_modules` e instalar todos los paquetes que están listados en package.json junto con sus dependencias.

Los paquetes también se pueden desisntalar si ya no se necesitan para el proyecto:

```bash
npm uninstall express
npm r express  # La opción r es alias de unisntall.
```

## Proyecto Node.js

Para crear proyecto de programación con Node.js se usa el comando `npm` con la opción `init`. Por ejemplo, creamos un directorio vació llamado `proyecto-npm` para nuestro proyecto, entramos en él y ejecutamos el siguiente comando:

```bash
npm init
```

Esto nos lleva a una aplicación por consola donde podemos ingresar datos del proyecto que queremos crear.

- nombre del paquete
- version (semver, versión semática)
- descripción
- script punto de entrada (el archivo js que inicia la apilcación)
- script para los test (el comando que se ejecuta para el testeo)
- repositorio git (url)
- palabras clave (para búsqueda en npm)
- autor
- licencia del proyecto

Esto crea el archivo `package.json` que es el archivo que describe el proyecto del directorio actual en el cuál vamos a trabajar. Como vimos arriba, cuando instalemos dependencias las va a listar en este archivo también.

Se le puede dar `enter` a cada opción y dejar todas por defecto, incluso está la opción `-y` que hace eso por defecto:

```bash
npm init -y  # Sí a todo.
```


### npm run

Dentro del archivo `package.json` creado con `npm init` hay una sección de scripts que se puede usar para agregar un comando que nos sirva para probar la aplicación. En la parte que dice:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

podemos reemplazar la entrada `"test"` o agregar otra que ejecute el comando que vamos a utilizar par iniciar el servidor, por ejemplo:

```json
  "scripts": {
    "test": "node index.js"
  },
```

Luego, en la terminar, dentro de la carpeta del proyecto de Node.js podemos ejecutar:

```bash
npm run test
```

y nos va a ejecutar nuestro los scipts que hayamos creado para probar que la aplicación funciones correctamente. Esto es muy útil cuando se necesitan distintas opciones para distintos puntos de acceso o configuraciones para ejecutar y probar el servidor.

Al script para iniciar el servidor se le suele poner el nombre *start*, por eso vamos a reemplazar el nombre de la llave `"test"` por `"start"` dentro de `"scripts"`:

```json
  "scripts": {
    "start": "node index.js"
  },
```

y luego se puede ejecutar el comando `npm`. Si se usan los nombres `test` y `start` para hacer pruebas o iniciar el servidro se puede omitir la opción `run`, npm acepta esos nombres y los busca como sripts en `package.json`:

```bash
npm start  # Ok.
npm test  # Ok.
```

## Módulos de desarrollo

Además de los módolos que necesitamos para que la aplicación funciones, también vamos a necesitar otros para que nos faciliten el desarrollo. Por ejemplo, si queremos que el servidor se reinicie automáticamente cuando cambiamos el código fuente, vamos a necesitar de una aplicación que esté monitoreando los cambios en los archivos y volviendo a ejecutar el comando para iniciar al servidor.

Las **dependecias de desarrollo** son librerías que no vamos a necesitar cuando subamos nuestra aplicación a un servidor y, como utilizan recursos y requieren espacio, las podemos diferenciar de las **dependencias de producción**. De esta manera las librerías de desarrollo solo las instalamos cuando estamos trabajando en el proyecto pero no cuando el proyecto está en producción.

Una de las aplicaciones Node.js que se utiliza para esto se llama nodemon (monitor de node) y se puede instalar como dependencia de desarrollo con la opción `-D`:

```bash
npm i nodemon -D
```

Esto instala el comando y agrega la informarmación en `package.json` dentro de la llave `"devDependencies"`.

Para utilizar `nodemon` tenemos que crear otro comando dentro de la sección de scripts de `package.json`, por convención lo vamos a llamar `dev`:

```json
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
```

Luego podemos ejecutar:

```bash
npm run dev
```

y vamos a tener el servidor corriendo y reiniciándose cada vez que hagamos un cambio. Esto nos evita tener que estar ejecutando los comando cada vez que cambiamos algo para probar.


## Proyecto en Express

Para crear un proyecto utilizando la librería express tenemos que realizar los siguiente pasos.

Primero creamos una carpeta vacío llamada `proyecto-express` y luego, desde dentro de esa carpeta ejecutamos el comando:

```bash
npm init -y
```

Eso nos crea el archivo `package.json` con el siguiente contenido por defecto:

```json
{
  "name": "proyecto-express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```


Luego instalamos la librería express:

```bash
npm i express
```

Esto nos agrega el directorio `node_modules` y el archivo `package-lock.json`, que no hay que tocar, `npm` se encarga de estos archivos cuando instalamos o modificamos dependencias. Y también no actualiza el archivo `package.json` con `express` como **dependencia de producción** luego de la llave `"license"`:

```json
{
  "name": "proyecto-express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  },
}
```

Luego le agregamos la librería `nodemon` como **dependencia de desarrollo**:

```bash
npm i nodemon -D
```

Eso, de nuevo, instala y actualiza los archivos dentro de `node_modules` y el archivo `package-lock.json` que lista las dependencias instaladas en ese directorio. Pero también nos actualiza `package.json` con la librería `nodemon` como **dependencia de desarrollo** abajo de todo:

```json
{
  "name": "proyecto-express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

Hasta ahora solo tenemos tres cosas en el directorio del proyecto, una carpeta y dos archivos JSON, nada más:

```bash
node_modules  package.json  package-lock.json
```

Ahora, antes de configurar `npm run` con los escripts `start` y `dev` (no vamos a utilizar `test`) vamos a crear los archivos mínimos necesario, pero para eso vamos a utilizar una estructura de directorios, que vamos a ir completando en base a convenciones durante las siguientes clases, para organizar distintos tipos de archivos dentro de `proyecto-express`.

El script principal, que vamos a llamar `app.js` y lo vamos a poner en la carpeta principal, junto con los archivos JSON. El nombre `app.js` **no** es el valor por defecto de `npm init` y por eso tenemos que cambiar el valor de la llave `"main"` en el archivo `package.json`.

```json
  "main": "app.js",
```

La carpeta `static` la vamos a utilizar para guardar las págias web y los recursos estáticos, las que no se modifican con la información de usuario y que suelen ser públicas.

La carpeta `views` la vamos a utilizar para los componentes de las páginas dinámica que luego vamos a hacer con templates.

La carpeta `src` (por source) la vamos a utilizar para poner los sripts del servidor salvo el script principal (`app.js`).

Para el ejemplo de hoy solo vamos a necesitar `app.js` y la carpeta `static`. Entonces vamos a crear el script principal `app.js` y, dentro de la carpeta static, una página HTML que vamos a llamar `index.html`. La estructura de directorios debería quedar así:

```bash
node_modules
static
  index.html
app.js
package-lock.json
package.json
```

Estas cosas pueden parece caprichosas pero son muy importantes porque luego el proyecto se va complejizando.

En este caso archivo `./static/index.html` contiene una página html por defecto que podemos crear en vscode escribiendo `html:5`, tocando `<enter>` y cambiando el título y agregando algo visible dentro de `<body>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página princial</title>
</head>
<body>
    <h1>Proyecto Express</h1>
</body>
</html>
```

Y el archivo `app.js` va a contener el archivo que vamos a estudiar a continuación.

Ahora, lo único que falta es configurar los scripts `start` y `dev` en el archiov `package.js`, para eso simplmenente modificamos la sección scripts y la dejamos de la siguiente manera:

```json
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
```

En el archivo `app.js` podemos copiar el código del ejemplo de más arriba que crea el servidor más simple:

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.sendFile('./static/index.html', {root: __dirname});
});

const port = 3000;
// Inicialización de la aplicación servidor.
app.listen(port);
console.log(`Server running on port ${port}`);
```

Luego para desarrollar y poder ver los cambios usamos el comando:

```bash
npm run dev
```

Y con eso ya está el servidor andando y actualizándose a cada modificación sin tener que estar volviendo a ejecutar el comando cada vez que hagamos un cambio.
