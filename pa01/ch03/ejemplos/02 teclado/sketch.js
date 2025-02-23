/*
  Eventos de entrada: teclado.

  Variables:

  key: Contiene el último caracter ASCII presionado.
  keyCode: Contiene modificadores (teclas que no son caracteres ASCII).
  keyIsPressed: Variable buleana que dice cuando una tecla cualquiera está siendo presionada.

  Funciones callback:

  keyTyped(): Se llama cuando un caracter de escritura es ingresado (á, ü, enter que es nueva línea, etc.).
  keyPressed(): Se llaman cuando una tecla es presionada.
  keyReleased(): Se llaman cuando se suelta una tecla.

  Estas funciones reciben como argumento un objeto KeyboardEvent que contiene
  información sobre el evento del teclado (key, code, etc.). No es necesario
  usarlo en p5.js porque está pensado para usar las variables de arriba.

  Función de comprobación:

  keyIsDown(value): Comprueba si la tecla `value` está siendo presionada.

  Hay constantes que representan los valores de las teclas no alfanuméricas:
  https://p5js.org/reference/#p5/keyCode
*/

const buf = new TextBuffer();  // Definido en textbuf.js, simplifica, ignorar.


function setup() {
  createCanvas(400, 400);
  textSize(40);
}

function draw() {
  background(220);
  text(buf.text(), 0, textAscent());
}

/*
  Esta función ignora Backspace, Delete (¡no la ignora!), Ctrl, Shift y Alt.
*/
function keyTyped(e) {
  // Log para comprobar qué teclas reconoce.
  // console.log('pressed', e);
  switch(keyCode) {
    case ENTER:
      buf.write('\n');
      break;
    case DELETE:
      break;
    default:
      buf.write(key);
  }
}

function keyPressed(e) {
  // Log para comprobar qué teclas reconoce.
  // console.log('pressed', e);
  switch(keyCode) {
    case BACKSPACE:
      buf.backspace();
      break;
    case RIGHT_ARROW:
      buf.moveRight();
      break;
    case LEFT_ARROW:
      buf.moveLeft();
      break;
    case DELETE:
      buf.delete();
      break;
  }
}

function keyReleased(e) {
  // Log para comprobar qué teclas reconoce.
  // console.log('released', e);
}
