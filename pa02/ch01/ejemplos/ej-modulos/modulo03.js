// Módulo de usuario.

class MiObjeto {
    constructor() {
        this.value = 123;
    }
}

function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

/**
 * Se pueden poner directamente los nombres de las variables
 * y los guarda en un objeto de JavaScript con su nombre y valor.
 */
module.exports = {
    MiObjeto,
    suma,
    resta
}
