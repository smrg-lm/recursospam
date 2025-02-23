// Importa el módulo better-sqlite3.
const Database = require('better-sqlite3');


/**
 * CREACIÓN/APERTURA DE LA BD.
 */

// Crea la base de datos en memoria.
// Define la función log como la opción verbose para debuguear.
const db = new Database(':memory:', { verbose: console.log });


// O abre la base de datos del camino especificado.
// const db = new Database(__dirname + '/lorem.db');

/**
 * CREACIÓN DE LA TABLA
 */

// Crea la base de datos del ejemplo.
// Nota: utilizo "`" (literales de plantilla) para escribir en varias líneas.
db.prepare(`
CREATE TABLE personas
(
    id int,
    nombre varchar(255),
    apellido varchar(255),
    direccion varchar(255),
    ciudad varchar(255)
)
`).run();


/**
 * INSERCIÓN DE REGISTROS
 */

// Nota: Uso comillas dobles para poder usar comillas simples dentro de la cadena.
db.prepare("INSERT INTO personas VALUES (1, 'Ariel', 'Ramirez', 'Calle Falsa 123', 'La Tapla')").run();
db.prepare("INSERT INTO personas VALUES (2, 'Gustavo', 'Leguizamón', 'Salta 789', 'La Linda')").run();
db.prepare("INSERT INTO personas VALUES (3, 'Liliana', 'Herrero', 'Rosario 1950', 'La Nilda')").run();


/**
 * SELECCIÓN
 */

// Esta función selecciona e imprime todos los registros de la tabla con el comodín "*".
let ret = db.prepare("SELECT * FROM personas").all();
console.log('Todos los datos de la tabla:', ret);

// Esta función selecciona e imprime solo campos específicos de todos los registros.
ret = db.prepare("SELECT nombre, apellido FROM personas").all();
console.log('Nombre y apellido de todas las personas en la tabla:', ret);


/**
 * ACTUALIZACIÓN
 */

// Actualiza un registro y muestra el resultado.
db.prepare("UPDATE personas SET nombre='Pepe', apellido='Pipi' WHERE id='1'").run();
ret = db.prepare("SELECT * FROM personas").all();
console.log('Registro actualizado a Pepe Pipi:', ret);


/**
 * BORRADO
 */

// Borra los registros de nombre Pepe.
db.prepare("DELETE FROM personas WHERE nombre='Pepe' AND apellido='Pipi'").run();
ret = db.prepare("SELECT * FROM personas").all();
console.log('Tabla sin Pepe:', ret);


/**
 * BÚSQUEDA
 */

// Lista los registros cuya
ret = db.prepare("SELECT nombre, apellido FROM personas WHERE ciudad='La Nilda'").all();
console.log('Personas que viven en La Nilda:', ret);


/**
 * BORRAR TABLA
*/

db.prepare("DROP TABLE personas").run();
try {
    console.log('*** va el error');
    ret = db.prepare("SELECT * FROM personas").all();
} catch(err) {
    console.log('*** Error la tabla personas no existe:', err.message)
}


/**
 * CIERRE
 */

// Siempre cerrar la conexión, apagar, al terminar.
// ste código sirve luego para el servidor express.
process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit()); // Cierre de la terminal.
process.on('SIGINT', () => process.exit()); // Ctrl-C.
process.on('SIGTERM', () => process.exit()); // Ctrl-D.
