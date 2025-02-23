/*
  Ejemplo procedimiento.
*/

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  dibujo(0, 0, 100, 100);
  // rect(width / 2 - 50, height / 2 - 50, 100, 100);
  // filaDeDibujos(10, 0, 0, width, 50);
  matrizDeDibujos(10, 0, 0, width, height);
}

function dibujo(x, y, w, h) {
  fill('magenta');
  stroke('blue');
  strokeWeight(2);
  rect(x, y, w, h);
}

/*
    Subprograma que modifica el estado del lienzo.
    Dibuja una línea de `num` rectángulos en la posición
    <x, y> dentro del tamaño definido por width y height.
    El color de fill y stroke y el ancho de stroke son
    cambiados por la función `dibujo` que se llama desde
    esta función.
*/
function filaDeDibujos(num, x, y, w, h) {
  let ancho = w / num;
  for(let i = 0; i < num; i++) {
      dibujo(x + (ancho * i), y, ancho, h);
  }
}

function matrizDeDibujos(num, x, y, w, h) {
  let alto = h / num;
  for(let i = 0; i < num; i++) {
    // Se llama a la función con los argumentos correspondientes.
    filaDeDibujos(num, x, y + alto * i, w, alto);
  }
}
