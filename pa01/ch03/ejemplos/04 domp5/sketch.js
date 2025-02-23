/*
  Eventos den entrada: DOM usando la interfaz de p5.js.

  No vamos a ver todos los elementos, solo el funcionamiento general.

  createDiv()
  createButton()
  createSlider()
  createElement()

  Propiedades
  class
  style
  parent
  child
  input
*/

let sketchDiv;
let button;
let label;
let slider;

let visible = false;
let amount = 1;
let img;


function preload() {
  img = loadImage('assets/p01.png');
}


function setup() {
  const canvas = createCanvas(400, 400);

  // Div principal que contiene el canvas y los controles.
  sketchDiv = createDiv();
  sketchDiv.class('sketch');
  sketchDiv.style(`width: ${width}px;`);  // Usa el ancho del canvas.
  sketchDiv.child(canvas);

  // Espacio para los controles.
  const controls = createDiv();
  controls.class('controls');
  controls.style('display:flex; flex-direction:row; justify-content:space-around; background-color:lightgrey');
  controls.parent(sketchDiv);

  // Botón.
  button = createButton('Show Pikachu');
  button.mouseClicked(buttonCallback);  // Callback function.
  button.parent(controls);

  // Espacio para el slider.
  const sliderControl = createDiv();
  sliderControl.class('slider-control');
  sliderControl.style('display:flex; flex-direction:column;');
  sliderControl.parent(controls);

  // Slider con etiqueta.
  label = createElement('label', 'Amount of pikachu 1');
  slider = createSlider(1, 10, 0, 1);
  label.attribute('for', 'slider');
  slider.attribute('id', 'slider');
  slider.input(sliderCallback);  // Callback function.
  label.parent(sliderControl);
  slider.parent(sliderControl);
}

function draw() {
  background('lightgrey');
  if(visible) {
    for(let i = 0; i < amount; i++) {
      image(img, i * 25, i * 25);
    }
  }
}

function buttonCallback() {
  visible = !visible;
  if(visible) {
    button.html('Hide Pikachu');
  } else {
    button.html('Show Pikachu');
  }
}

function sliderCallback() {
  amount = slider.value();
  label.html(`Amount of Pikachu: ${amount}`);
}
