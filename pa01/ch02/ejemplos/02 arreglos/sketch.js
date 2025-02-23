/*
  Arreglos.
*/

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  /*
    Descomentar solo la función que se quiere ver.
  */
  // dibujo1();
  dibujo2();
}

function dibujo1() {
  let arr = [0, 50, 100, 150, 200, 250, 300, 350, 400];

  for(let i = 0; i < arr.length; i++) {
    line(0, 0, width, arr[i]);
  }
}

function dibujo2() {
  let onda = [];

  /*
    Este bucle llena el arreglo. No debería ir acá sino en setup
    porque son valores precalculados que no cambian, pero está
    hecho para que quede visible en un solo lugar.
  */
  for(let i = 0; i < width; i++) {
    // Mapeo el rango de valores de width a ángulos en radianes.
    let value = map(i, 0, width - 1, 0, TAU);
    // Calculo el valor de seno para cada ángulo.
    value = sin(value);
    // Mapeo el rango de valores a escala de girses.
    value = map(value + 1, 0, 2, 0, 255);
    // Lo guardo en el array.
    onda.push(value);
  }

  /*
    Este bucle utiliza los datos del arreglo.
  */
  for(let i = 0; i < width; i++) {
    stroke(onda[i]);
    line(i, 0, i, height);
  }
}
