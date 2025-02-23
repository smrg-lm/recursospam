/**
 * Este archivo contiene el script principal, es el programa
 * que llama a los otros módulos para agregar funcionalidad.
 * 
 * Este archivo llama a modulo02.js.
 */


/**
 * Importa el archivo modulo2.js que sí contienen elementos
 * exportados.
 */
const m2 = require('./modulo02.js');

/**
 * El valor de la variable m2 es el objeto que
 * se le pasó a module.exports.
 */
console.log('*** Imprime el valor de modulo02.js desde MAIN\n', m2);

/**
 * Con este objeto exportado desde modulo02.js se utilizan los
 * recursos de ese módulo.
 */
m2.función()
console.log(m2.número, m2.cadena);
