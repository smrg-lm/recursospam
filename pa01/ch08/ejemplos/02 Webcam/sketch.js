/**
 * Estos ejemplos muestran como capturar y procesar
 * imágenes de la cámara web o archvios subidos para
 * usar en el sketch.
 * 
 * # Funciones utilizadas:
 * 
 * createCapture() - Accede a la cámara de videos para generar un stream de imágenes.
 * createVideo() - Carga un archivo de video del servidor (cono createImage).
 * createFileInput() - Crea un elemento DOM para cargar un archivo (hacer en práctico).
 */

let video;

function setup() {
  createCanvas(320, 240);
  // Crea la entrada de video y retorna un elemento.
  // El elemento devuelto por createCapture actúa
  // como el objeto p5.Image.
  video = createCapture(VIDEO);
  // Se le asigna el tamaño del canvas.
  video.size(width, height);
  // Oculta el elemento HTML que crea.
  // video.hide();
}

function draw() {
  background(0);
  processedImage();
  // processedImage2();
  // filter(INVERT);
  // print(video.get(0, 0));
}


function processedImage() {
  // Como la imagen que contiene el video se está
  // actualizando constantemente hay que cargar los
  // pixels a cada frame. Esto no hay que hacerlo
  // para objetos p5.Image globales porque no cambia
  // el objeto ni su estado automáticamente.
  video.loadPixels();

  let pixels = video.pixels;
  for(let i = 0; i < pixels.length - 4; i += 4) {
    pixels[i] *= random(1.0);
    pixels[i + 1] *= random(1.0);
    pixels[i + 2] *= random(1.0);
  }

  video.updatePixels();
  image(video, 0, 0, width, height); // mouseX, mouseY);
}


/**
 * Esto es un ejemplo de captura el color de los pixels dispersos
 * para generar formas. Pero hay una manera mejor de hacerlo, porque
 * no estamos calculando el promedio de los pixels que nos salteamos
 * y la imagen original tiene muchos pixels de más. Igualmente, por
 * lo que pude probar, el rendimiento es el mismo. Lo que come cpu
 * es la cantidad de veces que se repiten las mismas operaciones.
 */
function processedImage2() {
  video.loadPixels();
  for(let y = 0; y < video.height; y += 10) {
    for(let x = 0; x < video.width; x += 10) {
      let i = (x + y * video.width) * 4;
      fill(video.pixels[i], video.pixels[i + 1], video.pixels[i + 2]);
      rect(x, y, 10, 10);
      // let b = brightness([video.pixels[i], video.pixels[i + 1], video.pixels[i + 2]]) / 255 * 4;
      // rect(x, y, 10 * b, 10 * b);
    }
  }
  // COMO NO SE USA LA IMAGEN NO ES NECESARIO ACTUALIZAR LOS PIXELS.
}
