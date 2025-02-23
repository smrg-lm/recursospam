/**
 * Este archivo contiene el script principal, es el programa
 * que llama a los otros módulos para agregar funcionalidad.
 * 
 * Este archivo llama a modulo01.js.
 */


/**
 * Importar el archivo modulo01.js como módulo. Este módulo
 * imprime su variable `module` con los datos de aquel archivo.
 */
const m1 = require('./modulo01.js');

/**
 * El objeto devuelto por require contiene lo que se exportó
 * desde modulo01.js, en este caso es un objeto vació.
 */
console.log('*** Imprime el valor de modulo01.js desde MAIN\n', m1);
