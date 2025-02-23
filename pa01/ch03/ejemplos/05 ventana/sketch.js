/*
  Funciones relacionadas a window.

  Variables globales en relación a la ventana:

  windowWidth
  windowHeight
  windowResized()
  fullscreen()

  Para redimensinar el canvas:

  resizeCanvas()
*/

let pos = { x: 0, y: 0 }


function setup() {
  // createCanvas(windowWidth, windowHeight);
  resizeCanvas(windowWidth, windowHeight);
  frameRate(5);
}

function draw() {
  background('lightgrey');
  circle(pos.x, pos.y, 100);

  // ¡La posición relativa depende del tamaño del canvas!
  pos.x = (pos.x + 10) % width;
  pos.y = (pos.y + 10) % height;
}

function keyTyped() {
  if(key == 'f') {
    fullscreen(!fullscreen());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  print(windowWidth, windowHeight);
}
