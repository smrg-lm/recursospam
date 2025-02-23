
let img;  // Declaro la variable que voy a usar entre distintas funciones de p5.js.

/*
  Esta es una función predefindida llamada por p5.js para inicializar los
  recursos y que estén disponibles antes de crear el canvas (se llama antes
  que setup). Esto es así porque el navegador carga los recursos de manera
  **asincrónica**.

  Ver: https://p5js.org/reference/#/p5/loadImage
*/

function preload() {
  /*
    Cargamos la imagen que tenemos guardada en el servidor en la carpeta assets.
    Si no existe el archivo se cuelga en "Loading..." y no evalúa el resto.
  */
  img = loadImage('assets/tux.png');
}

function setup() {
  // El ancho y alto del lienzo se obtiene del tamaño de la imagen.
  let w = img.width;
  let h = img.height;

  createCanvas(w, h);  // Se crea el canvas según el tamaño de la imagen.
  background(220);  // Define el color de fondo (porque tux.png tiene transparencia).
  background(img);  // Se puede pasar la imagen como fondo.
  noLoop();
}

function draw() {
  // Se puede llamar a background desde draw y sobreescribe lo que hizo setup.
}
