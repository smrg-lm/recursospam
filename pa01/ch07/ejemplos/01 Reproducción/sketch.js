/**
 * Para usar la librería de sonido, aunque nos viene
 * integrada con el plugin de vscode, siempre hay que
 * incluirla en `index.html` junto con p5.js.
 *
 * # Documentación
 *
 * https://p5js.org/reference/#/libraries/p5.sound
 *
 * # Funciones utilizadas
 *
 * soundFormats
 * loadSound(nombre, success, error, whileLoading)
 * .play()
 * .pause()
 * .stop()
 * .isLoaded()
 * .isPlaying()
 * .playMode()  // 'sustain', 'restart' 'untilDone'.
 */


let archivo;
let progreso;

/**
 * La carga de archivos siempre va dentro de la función
 * `preload` de p5.js para que inicie el sketch luego de
 * que todo esté cargado.
 */
function preload() {
  /**
   * Esta función declara los tipos de archivos
   * que vamos a utilizar. Esto lo utiliza p5.sound
   * para buscar los archivos que sean compatibles con
   * el navegador.
   * Nota: Es posible que esta función no busque correctamente
   * y haya que ponerle la extensión a los archivos en `loadSound`.
   */
  soundFormats('mp3', 'wav', 'ogg');
  /**
   * Esta función carga el archivo de nombre `groove` y su
   * extensión puede ser mp3 u ogg. Como segundo y tercer
   * argumento se le pueden pasar callbacks para que ejecute
   * código en caso de éxito o error al cargar. Los callbacks
   * son necesarios cuando la carga es asíncrónica.
   */
  archivo = loadSound('assets/groove', successFunc, errorFunc, loadingFunc);
}

/**
 * Esta función se llama en caso de que cargue correctamente
 * el archivo de audio. La definimos con el nombre que queramos
 * y ese nombre es el que le pasamos a la función `loadSound`
 * como segundo argumento. No se pueden llamar funciones de
 * Processing dentro de esta respuesta.
 */
function successFunc() {
  print('¡Cargó el archivo con éxito!');
}

/**
 * Esta función se llama en caso de que falle al cargar el
 * archivo de audio. La definimos con el nombre que queramos
 * y ese nombre es el que le pasamos a la función `loadSound`
 * como tercer argumento. No se pueden llamar funciones de
 * Processing dentro de esta respuesta.
 */
function errorFunc(msg) {
  // Imprime en la consola.
  print('No se pudo cargar el archivo');
  // Imprime en la página HTML sobre la etiqueta que crea p5 automáticamente.
  let e = document.getElementById('p5_loading');
  e.textContent = `¡Falló la carga! ${msg}`;
}

/**
 * Esta función se llama a medida que va cargando el archivo
 * de audio, al ser llamada se le va pasan un valor entre 0 y 1
 * que indica el progreso. La definimos con el nombre que queramos
 * y ese nombre es el que le pasamos a la función `loadSound`
 * como tercer argumento. No se pueden llamar funciones de
 * Processing dentro de esta respuesta.
 */
function loadingFunc(value) {
  progreso = value;
  // Imprime en la consola.
  print('Cargando el archivo...', progreso);
  // Imprime en la página HTML sobre la etiqueta que crea p5 automáticamente.
  let e = document.getElementById('p5_loading');
  e.textContent = `Cargando archivo ${progreso}`;
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  textSize(30);

  if(archivo.isLoaded()) {
    text('Archivo cargado.', 0, textAscent());
  } else {
    text('Error al cargar el archivo.', 0, textAscent())
  }

  /**
   * No hacer esto, genera sobrecarga al llamar a play
   * por cada frame.
   */
  // archivo.playMode('untilDone');
  // archivo.play();
}

function mousePressed() {
  // Si el archivo no se cargó no debemos hacer nada.
  if(!archivo.isLoaded()) {
    return;
  }

  /**
   * Por defecto es archivo.playMode('sustain') que
   * agrega otra reproducción sobre la anterior cada
   * vez que se llama a `play`.
   * Otra es 'restart', que reinicia la reproducción
   * del archivo desde el inicio (no agrega nada).
   * Y la última es 'untilDone' que ignora las llamadas
   * a play hasta que el archivo haya termiando.
   * Como queremos hacer play y pause dejamos el modo
   * 'sustain', comprobamos si se está reproduciendo
   * y llamamos al método `pause` que pausa la reproducción,
   * al llamar a `play` nuevamente reanuda desde la pausa.
   */
  if(!archivo.isPlaying()) {
    archivo.play();
  } else {
    archivo.pause();
    // Si llamamos a `stop` al volver a llamar a `play`
    // inicia la reproducción desde el principio. En
    // este caso funcionaría como 'restart'.
    // archivo.stop();
  }
}
