
let n = 100;
let pelotas = [];


function setup() {
  createCanvas(400, 400);

  for(let i = 0; i < n; i++) {
    const c = color(random(255), random(255), random(255));
    pelotas.push(new Pelota(width / 2, height / 2, random(10, 10), c));
  }
}

function draw() {
  background(220);
  for(pelota of pelotas) {
    pelota.move();
    pelota.draw();
  }
}
