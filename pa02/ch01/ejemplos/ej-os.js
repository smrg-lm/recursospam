const os = require('os');

let mem = os.totalmem();  // Capacidad de la memoria RAM.
let free = os.freemem();  // Memoria RAM disponible.

console.log(`Memoria total: ${mem}, memoria libre: ${free}`);
