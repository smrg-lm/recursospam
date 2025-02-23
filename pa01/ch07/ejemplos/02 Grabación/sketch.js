/**
 * Ejemplod de la documentación: https://p5js.org/reference/#/p5.SoundRecorder
 *
 * Funciones y objetos utilizadas:
 *
 * mousePressed como callback del objeto canvas.
 *
 * p5.AudioIn
 * .start() inicializa el micrófono y pide permiso al usuario.
 *
 * p5.SoundRecorder
 * .setInput(audioIn) define la fuente a grabar.
 * .record(soundFile) inicia la grabación
 * .stop() detiene la grabación
 *
 * p5.SoundFile
 *
 * userStartAudio() Si no se llama a esta función no se puede usar el micrófono.
 * save(soundFile, fileName) guarda el archivo en la compu como descarga.
 */


let mic, recorder, soundFile;
let state = 0;


function setup() {
  // Crea un canvas y se queda con el objeto
  // para acceder a sus métodos.
  let cnv = createCanvas(400, 400);

  /**
   * En vez de definir la función mousePressed se
   * queda con el objeto canvas y le pasa una función
   * como respuesta mediante el método `mousePressed`
   * de canvas.
   */
  cnv.mousePressed(canvasPressed);

  // Crea una entrada de audio (la entrada por defecto).
  mic = new p5.AudioIn();
  // Le avisa al usuario que se requiere el uso del mic.
  mic.start();

  // Crea un objeto grabador.
  recorder = new p5.SoundRecorder();
  // Conecta la señal del micrófono como entrada del grabador.
  recorder.setInput(mic);

  // Este objeto SoundFile se utilizará para guardar y reproducir la grabación.
  soundFile = new p5.SoundFile();

  background(220);
  textAlign(CENTER, CENTER);
  text('tap to record', width/2, height/2);
}

/**
 * Esta función tiene un nombre arbitrario, lo definimos
 * como queramos. Al ser un callback/respuesta a mosuePressed
 * se pueden llamar primitivas de dibujo.
 *
 * **Nótese que no hay función `function draw()` en este sketch.**
 */
function canvasPressed() {
  // Ensure audio is enabled
  userStartAudio();

  // make sure user enabled the mic
  if (state === 0 && mic.enabled) {
    // Al primer click inicia la grabación.
    background(200,0,0);
    text('Recording!', width/2, height/2);
    state++;

    // Al pasarle el objeto p5.SoundFile la grabación
    // se guarda en él cuando termina de grabar.
    recorder.record(soundFile);
  } else if (state === 1) {
    // Al segundo clic detiene la grabación.
    background(0,200,0);
    text('Done! Tap to play and download', width/2, height/2);
    state++;

    // Detiene la grabación y le envía los datos
    // al objeto soundFile.
    recorder.stop();
  } else if (state === 2) {
    // Al tercer clic reproduce la grabación y descarga el archivo.
    background(60, 60, 255);
    text('Playing!', width/2, height/2);
    state++;

    // Play y save. En Chrome descarga el archivo en formato wav/aiff.
    soundFile.play();
    save(soundFile, 'mySound.wav');
  }
}
