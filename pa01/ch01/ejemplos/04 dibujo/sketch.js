/*
  # Primitivas 2D

  Las primitivas de dibujo 2D están enumeradas en el apartado
  Formas (Shapes) de la documentación de p5.js y son las siguientes:

  point()
  line()

  rect()
  quad()
  square()
  triangle()

  circle()
  ellipse()
  arc()

  También son importantes las primitivas de relleno y trazo:

  fill() -- Rellenar con color.
  noFill()

  stroke() -- Dibujar bordes.
  noStroke()

  Y los atributos de dibujo de las formas:

  ellipseMode() -- Modo de centrado. Afecta a ellipse(), circle() y arc() (CENTER, RADIUS, CORNER, CORNERS)
  rectMode() -- Modo de centrado. Afecta a rect() (CORNER, CORNERS, CENTER, RADIUS)

  smooth() -- Antialias, activo por defecto en P2D.
  noSmooth()  -- Desactiva el antialias.

  strokeWeight() -- Ancho de la línea en pixels.
  strokeCap() -- Estilo punto de la línea (ROUND, SQUARE, PROJECT).
  strokeJoin() -- Estilo de las uniones de vertex (beginShape/endShape)

  https://p5js.org/reference/#group-Shape
  https://p5js.org/reference/#group-Color  
  */

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
