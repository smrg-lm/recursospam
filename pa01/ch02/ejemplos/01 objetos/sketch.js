/*
  Objetos como estructura de datos.

  Aunque el ejemplo sea trivial con el objeto guardamos toda
  la informacion (posición y tamaño) en un solo lugar. Luego,
  cuando veamos cómo crear clases va a tener más sentido.
*/

const c = { x: 0, y: 0, w: 100, h: 100 };


function setup() {
  createCanvas(400, 400);
  // frameRate(30);
}

function draw() {
  background(220);

  /*
    Descomentar solo la función que se quiere ver.
  */
  mov1();
  // mov2();
  // mov3();

  rect(c.x, c.y, c.w, c.h);
}

function mov1() {
  // Random
  c.x = random(0, width - c.w);
  c.y = random(0, height - c.h);
}

function mov2() {
  // Lineal
  c.x = (c.x + 1) % (width - c.w);
  c.y = (c.y + 1) % (height - c.h);
}

function mov3() {
  // Otro movimiento.
}
