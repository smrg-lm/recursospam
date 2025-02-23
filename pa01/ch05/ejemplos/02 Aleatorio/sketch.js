
let posx, posy, r;
let dx, dy;
let incx, incy;


function setup() {
  createCanvas(400, 400);
  posx = width / 2;
  posy = height / 2;
  r = 50;
  dx = dy = 0;
  incx = incy = 10;
}

function draw() {
  background(220);
  // dx = random(5);
  // dy = random(5);
  posx += random([-incx, 0, incx]);
  posx = constrain(posx, 0, width);
  posy += random([-incy, 0, incy]);
  posy = constrain(posy, 0, height);
  circle(posx + dx, posy + dy, r);
}
