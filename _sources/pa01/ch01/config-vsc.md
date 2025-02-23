# Entorno de desarrollo


## Instalación de vscode

- Visual Studio Code es un editor gratuito y de código abierto muy utilizado en la actualidad.
- Es multiplataforma (Windows, Linux y Mac).
- Lo vamos a utilizar porque brinda varias herramientas que facilitan mucho el trabajo con código de programación, por ejemplo:
  - Nos garantiza la codificación de los archivos (**UTF-8**) lo cual es muy importante.
  - Provee resaltado de sintáxis, comprobación de errores sintácticos, de estilo y lógicos (linting), autoformato de código, etc.
- Vamos a ser insistentes con cuestiones de formato y organización del código y los proyectos.

Se puede descargar desde su página web: https://code.visualstudio.com

Instalación: Darle siguiente y que sí a todo, no hay otra opción.


## Extensiones para vscode

Para trabajar con `p5.js` vamos a utilizar dos extensiones muy simples, una que genera proyectos `p5.js` y otra que funciona como pseudo-servidor web para que podamos probar los resultados en el navegador. Las extensiones se pueden instalar desde la barra lateral buscando por nombre en extensiones (ctrl-shift-x).


### p5-vscode

Esta extensión crea los archivos necesarios para hacer un sketch web con `p5.js` y agrega documentación que se puede ver al editar el código.

https://marketplace.visualstudio.com/items?itemName=samplavigne.p5-vscode

Una vez instalada:

1. Abrir la paleta de comandos con `ctrl-shift-p` y escribir `Create p5.js Project` y seleccionar la opción o `<enter>`.
2. Elegir una carpeta vacía donde quiera generar el proyecto.

La estrucutra generada es la siguiente:

```tty
libraries
  p5.min.js
  p5.sound.min.js
index.html
jsconfig.json
sketch.js
style.css
```

La carpeta `libraries` contiene las librerías de `p5.js` minificadas.
El archivo `.jsconfig` es un archivo de configuración de proyecto JavasScript para vscode (https://code.visualstudio.com/docs/languages/jsconfig). Define el estándar ES6 y la documentación al editar (tooltips).
Los archivos `index.html`, `style.css`, `sketch.js` son los archivos de la página web, el estilo y el script de `p5.js` listos para trabajar con el sketch.


### Live Server

Esta extensión es la que crea un servidor html para que podamos ejecutar el sketch en el navegador. Esta se instala como dependencia de la extensión anterior pero en caso de que no lo haga la deben instalar.

https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

Una vez instalada:

1. Aparece un botón en la barra de estado que dice "Go Live" con el cuál se inicia el servidor.
2. Luego de iniciado, el botón nos indica el puerto (por defecto es 5500 para va aumentado si se crean varios servidores a la vez) y abre el navegador por defecto en la dirección `localhost:5500` o `127.0.0.1:5500`.
3. Para detener el servidor hay que volver a tocar el botón que ahora dice el puerto.


## Atajos VSCode

- `ctrl-p` abre la paleta de comandos.
- `ctrl-shift-p` abre la paleta de comandos para ejecutar (con `>`por defecto)
- `ctrl-shift-i` formatea el archivo (`ctrl-p` y escribiendo `"format"` da más opciones)
- `ctrl-k ctrl-f` da formato a la selección.
- En un archivo html vacío escribir `html5` y tocar `<enter>` para que complete la estructura básica de una página.
- En un archivo html escribir `loremN`, siendo `N` en el número de palabras, y tocar `<enter>` para que rellene con texto de prueba.

### Avanzados

En la paleta de comandos (`ctrl-p`) tipear

- `>` ejecutar comandos (`ctrl-shift-p` es el atajo directo).
- `@` para buscar símbolos en el archivo (`ctrl-shift-.` es el atajo directo).
- `#` para buscar símbolos en todo el proyecto (hace búsqueda inteligente con inciales).
- `:` para ir a una línea (`ctr-g` es el atajo directo).
- `ctrl-d` finde match, resalta la palabra actual, cada vez que se repite `ctr-d` busca las iguales y habilita edición multilínea.
- `ctrl-shift arrows` edición multilínea, también se pueden crear múltiples cursores con `alt-click`.
- `ctrl-x` corta una línea de código.
- `alt arrows` mueve una línea de código (o bloque seleccionado), agregando `shift` copia y pega en líneas consecutivas (pero no me funciona esto último).
- `ctrl-l` reslta línea por línea de arriba para abajo. Útil para comentar bloques con `ctrl-/`.
- Hay una extensión add js comments para que comente js con formato, se puede seleccionar la firma de una función y agrega un comentario con los parámetros el famoso @param {string} path (en typescript), o {@link otherFunction} para agregar un link a otra función, agrega tooltip de atajo.
- Se pueden crear archivos json command y json snippet para agregar comandos o boilerplate a los proyectos.
- Para renombrar funciones/clases find all references (`ctrl-shirt-F12`) y rename symbol (`F12`), ambas están en el menú con click derecho.

**Buscar un machete de comandos integrado en internet**
