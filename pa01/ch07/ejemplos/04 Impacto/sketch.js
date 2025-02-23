/**
 * Este scketh muestra cómo integrar sonido en objetos y que
 * es necesaria la interacción del usuario para inicializar
 * el sonido.
 *
 * Es la modificación de un sketch que hicimos en clases anteriores.
 */


let started = false;
let pelota;
let sound;


function preload() {
  // print('preload desde sketch.js');
  sound = loadSound('assets/pium.wav');
}

function setup() {
  createCanvas(400, 400);
  /**
   * Así como a la pelota le pasamos el tamaño y el color
   * también le pasamos el objeto SoundFile.
   */
  const c = color(random(255), random(255), random(255));
  pelota = new Pelota(width / 2, height / 2, 30, c, sound);
}

function draw() {
  background(220);
  if(started) {
    pelota.move();
    pelota.draw();
  } else {
    textAlign(CENTER);
    text('Click to start!', width / 2, height / 2);
  }
}

function mouseClicked() {
  /**
   * En los navegadores es obligatorio que haya una acción
   * por parte del usuario para que el sonido se pueda iniciar.
   */
  if(!started) {
    started = true;
  }
}
