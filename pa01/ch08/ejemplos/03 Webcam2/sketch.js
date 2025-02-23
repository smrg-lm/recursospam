/**
 * Igual que el webcam pero achicando el tamaño de la imagen capturada.
 */

let video;
let vScale = 10;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  // video.hide();
}

function draw() {
  background(0);
  processedImage();
}

function processedImage() {
  video.loadPixels();
  let pixels = video.pixels;
  // La cantidad es mucho menor.
  print(pixels.length, video.width, vScale);

  for(let y = 0; y < video.height; y++) {
    for(let x = 0; x < video.width; x++) {
      // Calcúla el índice lineal.
      let i = (x + y * video.width) * 4;
      let r = pixels[i];
      let g = pixels[i + 1];
      let b = pixels[i + 2];

      // Calcula el brillo y se normaliza entre 0 y 1.
      let brg = brightness(r, g, b);
      // Escala en relación a vScale que es el espacio entre posiciones.
      let w = map(brg, 0, 255, 0, vScale);

      fill(r, g, b);
      rect(x * vScale, y * vScale, w, w);
    }
  }

  // COMO NO SE USA LA IMAGEN NO ES NECESARIO ACTUALIZAR LOS PIXELS.
}
