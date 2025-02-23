/*
  # Elemento canvas

  Nota: Ver las modificaciones en el archivo css.

  https://p5js.org/reference/#/p5/createCanvas
  https://developer.mozilla.org/es/docs/Web/HTML/Element/canvas
  https://developer.mozilla.org/es/docs/Web/API/Canvas_API
*/

let w = 400;
let h = 400;

function setup() {
  /*
    La función `print` de processing envuelve a `console.log`.
  */
  print(`Llama a createCanvas(${w}, ${h})`);

  /*
    Crea un elemento `<canvas>` en la página web dentro del elemento `<main>`.
    Si no se llama a esta función crea un canvas de 100x100 por defecto.
    Processing actúa como reemplazo de la API del elemento `<canvas>`.
  */
  createCanvas(w, h);  // Por defecto el modo es P2D.

  /*
    Por defecto el color de fondo es blanco.
    Lo cambiamos a gris para poder ver los límites.
  */
  background(220);

  /*
    Frecuencia de actualización del dibujo, puede ser útil para controlar
    el rendimiento del navegador.
  */
  // frameRate(1);

  // Ejemplo para flexbox con las modificaciones del archivo css.
  // createSlider();
}

function draw() {
  /*
    Dibujo de ejemplo.
  */
  rectMode(CENTER);
  rect(width / 2, height / 2, 100);
}
