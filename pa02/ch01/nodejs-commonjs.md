# Node.js y módulos CommonJS

Descarga la [Carpeta de Ejemplos](./ejemplos.zip)


## Utilización de la línea de comandos

En Unix:

- Bash
- Zsh
- Otros

En Windows:

- Símbolo de Sistema / Command Prompt / cmd.ex
- PowerShell.

Referencia de comandos Windows (cmd.exe):

https://es.wikipedia.org/wiki/S%C3%ADmbolo_del_sistema_de_Windows


### Estructura de los Comándos

```sh
$ nombre arg1 arg2 arg3
```

Primero se escribe el nombre del comando y luego, opcionalmente, una lista de argumentos. Los argumentos se separan por **espacios** y pueden ser muy variados en cuanto a su formato.

Existen distintas convenciones para los comandos.


## Node.js

En la primera mitad, hemos aprendido el lenguaje JavaScript utilizando la API de p5.js para crear animaciones dentro del elemento `<canvas>` de HTML y algunos otros elementos HTML soportados por esta API.

Venimos utilizando, la extensión `Live Server` de vscode para crear un servidor local junto con la extensión `p5.vscode` que crea uns estructura de página web básica (js, html, css, json).

Incluso vimos cómo funciona una API orientada a objetos muy simple que hiciemos para las escenas y los botones del trabajo integrador de la primera mitad... Las clases `Navegador` y `Pantalla` eran dos componentes de nuestra librería que debíamos saber utilizar según la lógica de diseño que proponían.

En esta segunda mitad le vamos a utilizar JavaScript direcatamente para crear nuestro propio servidor web con `Node.js` y sus librerías (distintas APIs).

¿Qué es `Node.js`?

- Es una tecnología relativamente nueva (2009)
- Unifica el lenguaje de programación del _backend_ con el _frontend_.
- Es un **entorno de ejecución** y un **(eco)sistema de librerías** para interactuar con el sistema operativo, crear servidores web, interactuar con bases de datos e incluso aplicaciones de escritorio.

```{note}
Node.js agrega sus propios módulos y objetos globales (ver más abajo) además o en vez de los propios de JavaScript en el navegador. Siempre hay que tener en cuenta qué objetos o módulos estamos usando y en qué contexto de ejecución.
```


### Instalación

Se descarga desde:

https://nodejs.org/es

Hay varias versiones, vamos a utilizar la última versión _LTS_ (Long Term Support) porque es estable y tienen soporte a largo plazo. Hay otras versiones que se actualizan con nuevas caracterísiticas y también están disponibles las versiones anteriores pero para evitar conflictos con las versiones de node y las librerías nos vamos a quedar la versión LTS al momento de iniciar esta segunda parte.

```{note}
Mientras que las versión más nuevas se actualiza más rápido (cambian y agregan cosas). Esto es importante para la compatibilidad aunque los proyecto en Node.js guardan las versiones de las librerías como veremos más adelante.
```

Para Windows el entorno Node.js viene con un instalador. Se puede instalar con la configuración por defecto y tiene que andar bien (e.j. "siguiente a todo").

```{note}
Puede que haya que cerrar y volver a abrir vscode para que se actualicen las variables de entorno, si van a usar la terminal desde vscode.
```

Para probar la instalación escribir en la terminal:

```bash
node --version
```

que tiene que devolver el número de la versión que descargaron, por ejemplo:

```bash
v20.17.0
```

> Nota. Por si las dudas, para trabajos que se pueden quedar guardados durante años, conviene anotar la versión de node que se está utilizando. Las versiones de las librerías pueden andar o no con distintas versiones de node.


### Modo REPL

Si se escribe solo el comando `node` en la terminal el intérprete se ejecuta en modo _REPL_ (Read Eval Print Poop). Del modo REPL se puede salir con `ctrl-c` (dos veces), `ctrl-d` (dos veces) o evaluando `.exit` (nótese el punto al inicio) como comando o utilizando el método `exit` del objeto integrado `process`. Esto es importante por si algo sale mal.

Ejemplos en modo REPL:

```js
// Función flecha como callback (función de respuesta).
// No deja de correr, no puedo ver los comandos que escribo
// ¿Cómo salgo?
setInterval(() => console.log('hola'), 1000)
```

```js
process.version  // Versión de Node.js
process.exit()  // Sale del programa intérprete (modo REPL).
```

```{note}
Dentro del intérprete de Node.js, el objeto `process` es el equivalente en el sistema operativo a `window` en el navegador (en node no hay objeto window y viceversa). Ver más abajo.
```

El REPL tiene ayuda integrada, se puede acceder tipeando `.help`. Los comandos con punto son específicos del REPL de Node.js, no existen en otro contexto.

```bash
> .help
.break    Sometimes you get stuck, this gets you out
.clear    Alias for .break
.editor   Enter editor mode
.exit     Exit the REPL
.help     Print this help message
.load     Load JS from a file into the REPL session
.save     Save all evaluated commands in this REPL session to a file

Press Ctrl+C to abort current expression, Ctrl+D to exit the REPL
```

Desde la terminal, también se pueden evaluar una expresión de JavaSript utilizando el comando `node` con el flag `-e`, esto es una característica de mucho lenguajes interpretados:

```powershell
node -e "console.log(2 + 2)"
```

### Objetos globales de Node.js y el navegador

Objetos comúnes del navegador:

```js
window  // Ventana del navegador.
document  // Docuemnto abierto en la ventanda.
console  // Está en ambos.
```

Objetos globales Node.js:

```js
process  // Entorno de ejecución (simil window en el navegador).
os  // Interacción con el sistema operativo.
console  // Está en ambos.
module  // Es otro tipo de objeto distinto que refiere al módulo acutal (para imports).
require  // Es una función de Node.js que se utiliza para importar módulos (hay distintas maneras he ES6+).
```

Variables globales e Node.js que existen solo cuando se ejecutan programas desde archivos:

```js
__dirname  // Camino al directorio del archivo que se está evaluando (no existe en repl) es una cadena.
__filename  // Ídem, pero con el nombre de archivo.
```


### Ejecutar programas desde archivos

Para ejecutar programas (_scripts_) JavaScript desde archivos se debe invocar el comando con el nombre del archivo de la siguiente manera:

```sh
node programa.js
```

Los programas de ejempo de esta clase están en la carpeta `ejemplos`. Para poder evaluarlos sin tener que escribir todo el _path_ hay que situarse en la carpeta de los ejemplos desde la termianl con el comando `cd`.

El siguiente programa está en el archivo `ej-programa.js` en el directorio actual:

```javascript
// Para poder ver los resultados de las operaciones siempre tenemos
// que usar `console.log`, no existe la función `print` como en p5.js.
console.log('Inicio programa en Node.js');

// Declaramos variables y realizamos operaciones.
let x = 2;
let y = 8;
let resultado = x ** y;

// Imprimimos la cadena en la salida estándar.
console.log(`El resultado de x elevado a y es: ${resultado}`);
```

y lo podemos ejecutar en la termial como tal:

```sh
$ cd ejemplos
$ node programa1.js
Inicio programa en Node.js
El resultado de x elevado a y es: 256
```

En el ejemplo de arriba hay dos líneas que comienzan con el signo `$`. Este signo no se escribe, significa que lo que sigue es un comando a ser ejecutado por línea de comandos.

Puede representar al _símbolo de sistema_ en _MS-DOS_ o cualquier _shell_ que estemos utilizando. 

> Ejercicio: Evaluar el archivo `ejemplo-dirname.js` de la carpeta de ejemplos.


## Módulos en Node.js

Node.js provee una forma de crear e importar módulos y también cuenta con una librería de módulos estándar del intérprete. La documentación de estas librerías está disponble en:

https://nodejs.org/api/modules.html

```{note}
Por defecto puede que esa página nos muestre la docuemntación otra versión de la librería, en ese caso hay una opción para seleccionar la que estamos utilizando. Puede que no en todas las versiones estén las mismas librerías o que estas hayan cambiado en algo.
```

Estos módulos surgen de una especificación llamada [CommonJS](https://en.wikipedia.org/wiki/CommonJS) y, a veces, se los refiere con ese nombre. Los módulos de Node.js se pueden _importar_ dentro de nuestro programa con la función `require` que devuelve el objeto que representa el módulo y desde el cuál se pueden acceder sus objetos y funciones. El objeto módulo que retorna la función `require` se asigan a una constante con el mismo nombre por convención:

```javascript
const nombremodulo = require('nombremodulo');
```

```{note}
Esto difiere de cómo venimos trabajando en las páginas de p5.js donde en vez de importar módulos poníamos la etiqueta `<script>` con el código modularizado antes de usar el sketch. Además, después vamos a ver que el stándar ES6 también agregó una forma de crear e importar módulos que es posterior a la de Node.js.
```

Uno de los módulos estandar de Node.js es `os` (por _Operative System_) que sirve para obtener información del sistema operativo. El siguiente ejemplo está en el archivo `ej-os.js`.

```javascript
const os = require('os');

let mem = os.totalmem();  // Capacidad de la memoria RAM.
let free = os.freemem();  // Memoria RAM disponible.

console.log(`Memoria total: ${mem}, memoria libre: ${free}`)
```


### Módulos de usuario

Para crear un módulo propio dentro de un proyecto hay que utilizar el objeto global `module` y asignarle un objeto con los datos a exportar a la propiedad `exports`. Por ejemplo, dentro de un archivo llamado `modulo.js` podemos poner el siguiente código:

```javascript
module.exports = {
    número: 123,
    cadena: 'abc',
    función: () => console.log('función de mi módulo.')
}
```

Cualquier archivo de código JavaScript puede ser un módulo _CommonJS_, para poder usarlo como tal solo hay que utilizar la interfaz `module.exports` que almacena los datos del módulo y luego podemos importar el código con `require` y el path relativo al archivo actual. Por ejemplo, desde otro archivo, `main.js`, en el mismo directorio que el módulo podemos podemos hacer lo siguiente:

```javascript
const modulo = require('./modulo.js');
console.log('Utiliza el módulo', modulo.número, modulo.cadena);
modulo.función();
```

Lo que hace este sistema simplente es crear una manera de evaluar los scripts que son módulos y pasarle los valores del objeto global `module` al modulo o programa que lo requiere. Luego la función `require` búsca el módulo en los path preestablecidos evalúa el código JS que contiene y retorna el objeto que se le asignó a la propiedad `module.exports` del módulo.

```{note}
Esto lo vemos así por ahora porque es la manera histórica de trabajar con Node.js y es algo muy simple e inteligete, pero con el estandar ES6 se agregó una implementación a JavaScript para poder importar y exportár módulos que es muy similar y se puede utilizar del lado del cliente también. Es posible que el estandar reemplace el uso de CommonJS en el futuro.
```
