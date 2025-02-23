/*
  # Estructura básica de p5.js

  Al igual que en Processing tenemos las funciones `setup` y `draw`.

  Además agregamos la función `preload` que se usa para sincronizar
  la carga de los recursos de la página (imágenes, sonidos, datos, etc.).
  Esta función es importante porque JavaScript carga los recursos de
  manera asincrónica para no detener el procesamiento de la página y
  poder mostrarla lo antes posible.

  Luego veremos que también están las funciones que se definen para las
  interacciones como `mousePressed`, `buttonPressed` y demás.

  El contenido de este archivo luego es procesado por la librería p5.js
  que crea los objetos html y javascript necesaior para que todo funcione
  en la página web.

  Nota: Ver las notas en el archivo html y los elementos creados en el
  inspector del navegador.
*/

function preload() {
  // Función utilizada para cargar recursos antes de iniciar el dibujo.
  // Vamos a ver cómo se usa en la parte de imagen.
}

function setup() {
  // Confirugración inicial del dibujo, se llama después de preload y antes del ciclo draw.
  // createCanvas(400, 400); background(220); frameRate(30);
}

function draw() {
  // Función de dibujo periódica, se llama a frameRate().
  // background(220);
}

/*
  **Algo importante a tener en cuenta es que las funciones de dibujo y manejo
  de recursos de Processing solo se pueden usar dentro estas funciones y
  otras que veremos luego.**

  Si se llama a las funciones de dibujo fuera de las funciones de la estructura
  el navegador tira error sketch.js:47 Uncaught ReferenceError: ellipse is not defined
  y la página no carga correctamente.
  
  Probar las líneas de código comentadas de abajo.
*/

// ellipse(width / 2, height / 2, 100);  // ReferenceError
// createCanvas(400, 400);  // ReferenceError
// background(220);  // ReferenceError
