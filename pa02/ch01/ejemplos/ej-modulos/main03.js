/**
 * Este archivo contiene el script principal, es el programa
 * que llama a los otros módulos para agregar funcionalidad.
 * 
 * Este archivo llama a modulo03.js.
 */

/**
 * Importa el archivo modulo3.js que contiene funciones útiles
 * para el archivo que las importa.
 */
const m3 = require('./modulo03.js');

console.log('*** Usa las funciones de m3');
console.log('suma es', m3.suma(2, 2));
console.log('resta es', m3.resta(10, 8));
console.log('la clase es', m3.MiObjeto);

let obj = new m3.MiObjeto();
console.log('obj.value:', obj.value);
