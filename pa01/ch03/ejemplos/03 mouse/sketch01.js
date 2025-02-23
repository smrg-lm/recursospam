/*
  Eventos de entrada: ratón.

  Nota: En este proyecto hay varios sketch: sketch01.js, sketch02.js, etc.
  Cambiar el nombre de archivo en index.html para alternar entre ellos.

  Variables globales:

  Al igual que para las teclas existen variables globales que mantienen
  el valor del estado del ratón frame a frame.

  Posición relativa al sketch: mouseX/Y, pmouseX/Y.
  Posición relativa a la ventana: winMouseX/Y, pwinMouseX/Y.
  Botones: mouseButton (LEFT, CENTER, RIGHT), mouseIsPressed (true, false).
*/


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // todasLasVariables();
  todasLasVariables2();
}

function todasLasVariables() {
  // Ninja graph.
  if (mouseIsPressed && mouseButton == LEFT) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function todasLasVariables2() {
  // Estrellita pirotécnica.
  if (mouseIsPressed && mouseButton == LEFT) {
    const xoff = mouseX + random(-50, 50);
    const yoff = mouseY + random(-50, 50);
    line(mouseX, mouseY, xoff, yoff);
  }
}
