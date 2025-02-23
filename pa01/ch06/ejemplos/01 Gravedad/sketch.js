
let particle;

function setup() {
  createCanvas(400, 400);
  particle = new Particle(0, height / 2, 5, -4.2, 20);
}

function draw() {
  // Fondo negro con alfa para generar blur en el movimiento.
  // Esto solo se puede hacer para todo el sketch.
  background(0, 12);

  // Configuración para el dibujo de las partículas.
  fill(255);
  noStroke();

  particle.update();
  particle.draw();
}
