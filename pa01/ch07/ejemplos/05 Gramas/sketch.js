/**
 * Visualización de forma de onda.
 */


let waveFormView;
let spectrumView;


function preload() {
  soundFile = loadSound('assets/groove.mp3');
  soundFile.setLoop(true);
}

function setup() {
  createCanvas(400, 400);
  const w2 = width / 2;
  const h2 = height / 2;
  waveFormView = new Oscilloscope(soundFile, 0, 0, w2, h2);
  spectrumView = new Spectroscope(soundFile, w2, h2, w2, h2);
}

function draw() {
  background(220);
  waveFormView.draw();
  spectrumView.draw();
}

function mouseClicked() {
  waveFormView.clicked(mouseX, mouseY);
  spectrumView.clicked(mouseX, mouseY);
}
