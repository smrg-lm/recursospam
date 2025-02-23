
let centerX, centerY;
let posx, posy;
let diameter;
let amp, count, step;
let freq;


function setup() {
  createCanvas(400, 400);

  centerX = width / 2;
  centerY = height / 2;

  diameter = 50;

  count = 0;
  amp = 100;
  freq = 10;
  step = 0.01;

  background(220);
}

function draw() {
  background(220);

  posx = centerX + cos(count) * amp;
  posy = centerY + -sin(count) * amp;
  // amp = 50 + sin(count * freq) * 50;
  count += step;

  // Eje de rotación.
  fill(0);
  circle(centerX, centerY, 10);

  // Círuclo que rota.
  fill(255);
  circle(posx, posy, diameter);

  // Centro del círculo que rota.
  fill(0);
  circle(posx, posy, 10);

  // Línea que conecta el centro del círculo con el eje de rotación.
  line(centerX, centerY, posx, posy);
}
