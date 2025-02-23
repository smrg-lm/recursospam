# Introducción a p5.js

Descarga la [Carpeta de Ejemplos](./ejemplos.zip)


## Processing y JavaScript

Processing es una fundación que tiene como [misión](https://processingfoundation.org/) la alfabetización digital y el desarrollo inclusivo de la programación utilizando software de libre acceso.

> At our core is the philosophy and politics of FLOSS (Free, Libre, Open Source Software). We see software as a medium, and a means for thinking and making. We believe that learning to program is not only about acquiring a certain skill set, but also about developing a creative and exploratory process. We believe software, and the tools to learn it, should be accessible to everyone.

La fundación oficialmente soporta en la actualidad tres lenguajes (Java, JavaScript y Python) y dos plataformas (escritorio y android). Cada uno de estos lenguajes tienen sus ventajas y están orientados a la plataforma en la que se aplican. La librería que vamos a usar es la versión web de Processing en JavaScript.

Programar en processing no implica usar un entorno de programación restringido, como puede suceder con aplicaciones propietarias. Las librerías de Processing se basan en una API que hace énfasis en la facilidad de uso como recurso didáctico o de producción artística. Al cambiar el lenguaje cambian la sintaxis y los detalles de la implementación según la plataforma pero la concepción fundamental de la librería y su estructura se mantiene. Esto hace que sea relativamente fácil pasar de un lenguaje a otro ya que una vez familiarizad@s con la librería la lógica y las estructuras empleadas son las mismas.

En esta clase vamos a repasar estas concepciones y estructuras desde la programación web. En la carpeta `ejemplos` están los proyectos que vamos a utilizar en esta clase.


## 01 Estructura

Los programas en Processing se basan en el concpeto de _sketch_ (boceto/bosquejo/esbozo/croquis). Las funciones de configuración, manejo de recursos y dibujo siguen siempre una misma lógica.

Ver comentarios en los archivos html, js y css de la carpeta.


## 02 Canvas

A diferencia de Processing en java, en vez de llamar a la función `size()` para definir el tamaño del lienzo aquí tenemos que llamar a la función `createCanvas` que recibe los argumentos `width` y `height`. De esta manera se crea el canvas de dibujo dentro de la página web.

```javascript
function setup() {
    createCanvas(400, 400);
}
```

Luego, todas las funciones de dibujo que se llamen dentro de las funciones de p5.js van a ser aplicadas sobre ese canvas.

El canvas dentro de la página web es un elementos `<canvas>` de HTML 5 (ver las referencias en el código de ejemplo). El elemento `<canvas>` en si tiene su propia API JavaScript. Processing reemplaza esa API por la suya e incorpora recursos que son más fáciles de usar y se pueden desarrollar con pocas líneas de código. No todas las características de la API del canvas HTML 5 son accesibles a través de la librería p5.js pero se puede utilizar el objeto `drawingContext` para acceder a ellas.

El sistema de coordenadas depende del backend de renderizado que se utilice. Por defecto el modo es `P2D` que define el origen <0,0> (cero x e y) en la esquina superior izquierda. Los valores de las coordenadas se incrementan hacia abajo y hacia la derecha según el eje.

El otro backend de renderizado es `WebGL` que es 3D y utiliza la aceleración por hardware de la placa de video si está disponible. En este caso el sistema de coordenadas posiciona el punto <0,0,0> en el centro del lienzo. Esto es lo habitual cuando se trabaja con gráficos 3D. En este modo la posición de los objetos se maneja mediante primitivas de rotación y traslación en los ejes <x, y, z>. En principio no vamos a utilizar este modo.

```{note}
No existe el modo PDF.
```

A diferencia de Processing en Java, el lienzo también se puede redimencionar puesto que es un elemento HTML. Para esto se utiliza la función `resizeCanvas`. Sin embargo, para redimencionar el lienzo y que el dibujo sea coherente el manejo de las coordenadas de los pixels debe ser proporcional a un ancho y alto variable.

Ver comentarios en los archivos js y css de la carpeta.


## 03 Imagen

El lienzo es un _buffer_ de datos, cada instrucción que dibuja, tanto en setup como en draw, altera ese buffer. Si en draw se dejan de agregar primitivas de dibujo queda la imagen que se había dibujado antes. Para borrar el _buffer_ hay que aplicar una primitiva de dibujo (p.e. `background`) para que sobreescriba los datos almacenados pero para facilitar este proceso se puede utilizar la función `clear`.

Utilizando la función `createImage` se pueden cargar imágenes en memoria. La ruta al archivo de imagen a cargar se especifica de manera relativa al archivo del sketch siguiendo la lógica de los recursos de las páginas web. Formatos de imagen soportados por los navegadores web son png, jpg y gif.

```{note}
A diferencia de Processing en Java no existe _PImage_, existe `p5.Image` que no se usa directamente en esta clase, en cambio se usa la función `createImage` que devuelve un objeto `p5.Image`. En esta clase no vamos a ver la interfaz de `p5.Image`. También se puede utilizar `createCanvas` para crear más de un lienzo y utilizarlo como buffer secundario.
```

Una característica muy importante de JavaScript y la programación web en general es que los recursos (imágenes, audios, datos provenientes del servidor u otras páginas) **se cargan de manera asincrónica**. El framework p5.js nos facilita estas acciones, que más adelante veremos en detalle, con la función `preload`. Esta es una función garantiza que los recursos asíncrónicos estén cargados antes de que se evalúe la función `setup`. Internamente lo que hace es posponer la ejecución de `setup` hasta que los recursos estén cargados. Si los recursos tardan mucho en cargar en el lugar del elemento `<canvas>` se muestra el mensaje _Loading..._ en la página HTML.

```javascript
let img;
let snd;

function preload() {
    // Pre carga los recursos a utilizar en el sketch.
    img = loadImage('assets/tux.png');
    snd = loadSound('assets/noexiste.mp3');  // Función del módulo p5.sound.js
}
```

En cuanto a la organización de los recursos, en vez de utilizar una subcarpeta llamada _data_, como hacemos en Processing Java, los recursos que vayamos a utilizar en los bosquejos deben ser especificados mediante path relativo o URL. En el ejemplo de la carpeta se utiliza un subdirectorio llamado `assets`, por convensión, para organizar los archivos del lado del servidor.

Ver comentarios en el archivo js de la carpeta.


## 04 Dibujo

Ver comentarios en el archivo js de la carpeta.
