// Importa el módulo better-sqlite3.
const Database = require('better-sqlite3');
// Crea la base de datos en memoria.
const db = new Database(':memory:', { verbose: console.log });


// HACER COSAS.


// Siempre cerrar la conexión, apagar, al terminar.
// ste código sirve luego para el servidor express.
process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit()); // Cierre de la terminal.
process.on('SIGINT', () => process.exit()); // Ctrl-C.
process.on('SIGTERM', () => process.exit()); // Ctrl-D.

/**
 * https://en.wikipedia.org/wiki/Signal_(IPC)
 * 
 * SIGHUP ("signal hang up"): En plataformas compatibles con POSIX,
 * SIGHUP es una señal enviada a un proceso cuando su terminal de
 * control está cerrada. Originalmente fue diseñado para notificar el
 * proceso de caída de una línea serial.
 * 
 * SIGINT ("signal interrupt", Ctrl-C): Se envía a un proceso desde su
 * terminal de control cuando un usuario desea interrumpir el proceso.
 * Esto se hace normalmente presionando Ctrl+C,
 * 
 * SIGTERM ("signal terminate", Ctrl-D): Se envía a un proceso para
 * solicitar su finalización. A diferencia de la señal SIGKILL, el
 * proceso puede captarla e interpretarla o ignorarla. Esto permite que
 * el proceso realice una finalización correcta, liberando recursos y
 * guardando el estado si corresponde. SIGINT es casi idéntico a SIGTERM.
 */
