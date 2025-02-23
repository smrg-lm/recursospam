/*
  Conjuntos.
*/

let conj = new Set();


function setup() {
  createCanvas(400, 400);
  textSize(80);
  frameRate(1);
}

function draw() {
  background(220);

  /*
    Agrego las teclas que se van presionando. Al ser un conjunto
    no van a haber letras duplicadas (salvo mayúsculas y minúsuclas).
    Si la tecla presionada es 'Enter' se vacía el conjunto y el bucle
    for..of no hace nada.
  */

  if(key == 'Enter') {
    conj.clear();
  } else {
    conj.add(key);
  }

  /*
    Dibuja las letras pasando las minúsculas a mayúsculas en posiciones
    eleatorias dentro de width y heigth.
  */

  for(letra of conj) {
    text(letra.toUpperCase(), random(width), random(height));
  }
}
