
let easy;

function setup() {
  createCanvas(400, 400);
  easy = new Easing();
}

function draw() {
  background(220);
  easy.draw();
}

function mouseClicked() {
  easy.clicked();
}
