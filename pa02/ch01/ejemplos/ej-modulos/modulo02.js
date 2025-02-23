/**
 * Para exportar valores se crea un objeto literal y se le
 * asignan los valores y funciones que queremos hacer que
 * estén disponibles para quienes utilicen este módulo.
 * 
 * Este objeto se asigna a la propiedad export del objeto module.
 */

module.exports = {
    número: 123,
    cadena: 'abc',
    función: () => console.log('función de mi módulo.')
}

console.log('*** Imprime el valor de la variable `module` desde MODULO02\n', module);
