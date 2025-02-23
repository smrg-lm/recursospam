
let robot;


function setup() {
  createCanvas(400, 400);
  robot = new Robot(width / 2, height / 2);
}

function draw() {
  background(220);
  robot.move();
  robot.draw();
}
