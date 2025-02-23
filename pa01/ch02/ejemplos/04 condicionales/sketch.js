/*
  Condicionales (switch).
*/

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  seleccionar();

  /*
    Demostración de qué pasa y usamos `key` acá también.
  */
  // if(key == 'Enter') {
  //   print('tocaron enter...')
  //   seleccionar();  // No va a andar.
  // } else {
  //   background(220);
  // }
}

function seleccionar() {
  /*
    Nota: Ojo con la variable `key` porque contiene el valor
    de la última tecla presionada en el frame actual, no guarda
    el estado correctamente para muchos casos. La utilizamos
    como la manera más simple de interacción, el programa debe
    ser consistente.
  */
  switch(key.toLowerCase()) {
    case 'r':
      rojo();
      break;
    case 'v':
      verde();
      break;
    case 'a':
      azul();
      break;
  }
}

function rojo() {
  background(255, 0, 0);
}

function verde() {
  background(0, 255, 0);
}

function azul() {
  background(0, 0, 255);
}
