
let fuente;

function setup() {
  createCanvas(400, 400);
  // *** HACER UN ARRAY DE PARTÍCULAS.
  fuente = new Fuente(width / 2, height / 2, 30);
}

function draw() {
  // Fondo negro con alfa para generar blur en el movimiento.
  // Esto solo se puede hacer para todo el sketch.
  background(0, 12);

  // Configuración para el dibujo de las partículas.
  fill(255);
  noStroke();

  fuente.update();
  fuente.draw();
}
