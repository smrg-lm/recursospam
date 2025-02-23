/*
  Map como selector condicional.
  Esto luego se hace con polimorfismo en la POO.
*/

let dibujos = new Map();
dibujos.set('r', rojo);
dibujos.set('v', verde);
dibujos.set('a', azul);


function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  let value = key.toLowerCase();  // Se obtiene la última tecla presionada.

  if(dibujos.has(value)) {  // Si la llave (letra) está en el diccionario...
    let func = dibujos.get(value);  // Obtiene la función.
    func();  // Evalúa la función.
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
