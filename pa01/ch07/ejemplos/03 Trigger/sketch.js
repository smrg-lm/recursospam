/**
 * Este sketch demuestra como disparar samples con el teclado.
 * Si alguna vez usaron Minim tengan en cuenta que la API de
 * esta librería es distinta.
 * Este sketch tampoco usa la función draw.
 *
 * Funciones utilizadas:
 *
 * soundFormats
 * loadSound
 * SoundFile.play
 */

// Variables para guardar objetos SoundFile.
let kick, snare;

function setup() {
  // Definimos los formatos posibles (solo tengo dos wav yo
  // pero hay que usar formatos compatibles con los navegadores).
  // soundFormats('wav');

  // Cargamos los archivos de audio con loadSound.
  kick = loadSound('assets/kick.wav');
  snare = loadSound('assets/snare.wav');

  /**
   * Por defecto, `playMode()` es 'sustain' y podemos re-triguear
   * los archivos y no se cortan. ¿Qué pasa si onemos los objetos
   * SoundFile en modo 'restart'?
   */
  // kick.playMode('restart');
  // snare.playMode('restart');

  background(210);
}

function keyPressed() {
  // Trigueamos los archivos con las letras 'j' y 'f'
  // usando el método trigger. Cada trigger inicia una
  // nueva instancia de reproducción del archivo.
  if (key == 'j' || key == 'k') snare.play();
  if (key == 'd' || key == 'f') kick.play();
}
