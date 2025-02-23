/**
 * Este scket muestra cómo usar el array de pixeles
 * de p5.Image con distintas formas de calcular los
 * índices a recorrer.
 * 
 * # Documentación
 * 
 * https://p5js.org/reference/#/p5.Image
 * 
 * # Funciones utilizadas
 * 
 * pixelDensity() - Retorna o setea la densidad de los pixels según la resolución de la pantalla.
 * createImage() - Crea un objeto p5.Image
 * .loadPixels() - Crea el array pixels.
 * .updatePixels() - Actualiza los pixels de la imagen.
 * .pixels - Array de los valores rgba de la imagen.
 */

// Variable para almacenar el objeto p5.Image
let img;
let col = [0, 0, 255, 255];


function setup() {
  createCanvas(400, 400);

  // Fuerza a que 1 pixel de la imagen sea equivalente
  // a un pixel según distintas densidades de pixels
  // en distintas pantallas.
  pixelDensity(1);

  // Crea un objeto p5.Image del tamaño del canvas.
  img = createImage(width, height);
  // Crea un buffer, la imagen, para acceder a los
  // pixels. Solo se hace una vez. Luego hay que
  // actualizarlos con updatePixels()
  img.loadPixels();
}

function draw() {
  background(0);

  // Ejemplo 1.
  // paintPixels(...col);

  // Ejemplo 2 (comentar la anterior y descomentar esta).
  // randomPixels(...col);

  // Ejemplo 3.
  // setRandomPixels();

  // Ejemplo 4.
  setPixelsByLine();
}

/**
 * Recorre todo el array y le asigna un mismo color
 * a cada pixel.
 * 
 * No importan las filas y columnas en este ejemplo.
 */
function paintPixels(r = 0, g = 0, b = 0, a = 255) {
  const pixels = img.pixels;

  // A la logitud de array hay que restarle cuatro
  // porque el buble avanza de a cutro posiciones.
  for(let i = 0; i < pixels.length; i += 4) {
    pixels[i] = r;
    pixels[i + 1] = g;
    pixels[i + 2] = b;
    pixels[i + 3] = a;
  }

  img.updatePixels();
  image(img, 0, 0);
}


/**
 * Recorre todo el array y le asigna un mismo color
 * pero le agrega una desviación aleatoria.
 * 
 * No importan las filas y columnas en este ejemplo.
 */
function randomPixels(r = 0, g = 0, b = 0, a = 255) {
  const pixels = img.pixels;

  for(let i = 0; i < pixels.length - 4; i += 4) {
    pixels[i] = constrain(r + random(-127, 127), 0, 255);
    pixels[i + 1] = constrain(g + random(-127, 127), 0, 255);
    pixels[i + 2] = constrain(b + random(-127, 127), 0, 255);
    pixels[i + 3] = a;
  }

  img.updatePixels();
  image(img, 0, 0);
}


/**
 * Este ejemplo muestra como calcular la posición
 * dentro del array si tenemos las coordenadas x, y.
 * 
 * Importan las filas y columnas. A partir de la
 * posición x, y se calcula el índice en el array
 * de píxeles.
 */
function setPixel(x, y, r, g, b, a) {
  const pixels = img.pixels;
  const w = img.width;
  // La fórula es `posx + (posy * width)`.
  const index = (x + y * w) * 4;  // Todo por 4, cuatro posiciones consecuetivas son un pixel.
  pixels[index] = r
  pixels[index + 1] = g
  pixels[index + 2] = b
  pixels[index + 3] = a
}

/**
 * Esta función aplica la función anterior.
 * Va agregando pixels aleatoriamente frame
 * a frame, no borra lo que contenía la imagen
 * antes.
 */
function setRandomPixels() {
  let w = img.width;
  let h = img.height;
  let rx = int(random(0, w));  // SON ÍNDECES DE ARRAYS, DEBEN SER NÚMEROS ENTEROS.
  let ry = int(random(0, h));

  setPixel(rx, ry, 255, 255, 255, 255);

  img.updatePixels();
  image(img, 0, 0);
}

/**
 * Igual que la función anterior pero ahora va
 * por filas y pinta todo de un solo color, de
 * la misma manera que hace `paintPixels` arriba.
 */
function setPixelsByLine() {
  let w = img.width;
  let h = img.height;

  for(let y = 0; y < w; y++) {
    for(let x = 0; x < h; x++) {
      setPixel(x, y, 0, 255, 0, 255);
    }
  }

  img.updatePixels();
  image(img, 0, 0);
}

// /**
//  * Como calcular x, y desde un array de una dimensión.
//  */
// function indexPlano(r = 0, g = 0, b = 0, a = 255) {
//   // Tamaño del array en pixels (cada pixel contiene rgba).
//   const size = img.width * img.height;
//   let x, y;
//   for(let i = 0; i < size; i += 1) {
//     x = i % width;  // Calcula la posición de x (la columna en la que está)
//     y = int(i / width);  // Calcula la posición en y (la fila en la que está).
//   }
// }
