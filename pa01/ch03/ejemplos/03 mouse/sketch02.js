/*
    Eventos de entrada: ratón.

    Funciones callback:

    Las siguientes funciones son llamadas automáticamente por p5.js.

    En Processing, estas funciones se usan junto con las variables globales.
    Sin embargo, también reciben un evento MouseEvent que contiene toda la
    información sobre el evento del ratón.

    Básicas:

    mousePressed()
    mouseMoved()
    mouseReleased()
    mouseWheel()

    Como acciones predefinidas/preprocesadas (como sucede con keyTyped()):

    mouseClicked()
    doubleClicked()
    mouseDragged()

    Otras:

    requestPointerLock()
    exitPointerLock()
*/


function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
}

function mousePressed(e) {
    // print('pressed', e);
}

function mouseMoved(e) {
    // print('pressed', e);
}

function mouseReleased(e) {
    // print('released', e);
}

function mouseWheel(e) {
    // print('wheel', e);
}
