// Importa el módulo better-sqlite3.
const Database = require('better-sqlite3');
// Crea la base de datos en memoria.
const db = new Database(':memory:', { verbose: console.log });

// La misma tabla de siempre con los datos cargados.
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
db.prepare("INSERT INTO personas VALUES (1, 'Ariel', 'Ramirez', 'Calle Falsa 123', 'La Tapla')").run();
db.prepare("INSERT INTO personas VALUES (2, 'Gustavo', 'Leguizamón', 'Salta 789', 'La Linda')").run();
db.prepare("INSERT INTO personas VALUES (3, 'Liliana', 'Herrero', 'Rosario 1950', 'La Nilda')").run();
db.prepare("INSERT INTO personas (id, nombre, apellido) VALUES (4, 'Gustavo', 'Sanches')").run();
db.prepare("INSERT INTO personas (id, nombre, apellido) VALUES (5, 'Liliana', 'Perez')").run();

/**
 * Otra característica de las API para generar consultas SQL
 * son los _placeholders_. El concepto es el mismo que el de
 * las cadenas plantilla o los reemplazos al hacer log.
 */

let nombre = 'Lucas';
console.log(`El nombre es ${nombre}`)
console.log('El nombre es %s', nombre);

/**
 * Los placeholders sirven para crear consultas con valores
 * variables. Para esto, dentro del string de la consulta se
 * ponen caracters especiales o secuencias.
 *
 * El caracter especial para reemplazar un valor es `?`. 
 * Los valores a reemplazar también se pueden nombrar con
 * una palabra que comienze por alguno de los caracteres
 * `$`, `@` o `:`.
 * 
 * https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#binding-parameters
 * 
 * El siguiente ejemplo buscas personas con el mismo nombre.
 */

let stmt = db.prepare("SELECT nombre, apellido FROM personas WHERE nombre = ?");
console.log(stmt.all('Liliana'));
console.log(stmt.all('Gustavo'));

/**
 * El siguiente ejemplo usa placeholders con nombres de parámetros.
 * A los métodos `run`, `all` y `get` se les pasa un objeto cuyas
 * llaves son los nombres de los parámetros
 * 
 * Esto facilita y hace más legible muchas cuestiones de programación.
 * De esta manera se pueden crear funciones que reciban objetos con
 * los campos y valores a manajar.
 */

stmt = db.prepare('INSERT INTO personas (id, nombre, apellido) VALUES ($id, $nombre, $apellido)');
stmt.run({ id: 6, nombre: 'Lucas', apellido: 'Samaruga' });



// Siempre cerrar la conexión, apagar, al terminar.
// ste código sirve luego para el servidor express.
process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit()); // Cierre de la terminal.
process.on('SIGINT', () => process.exit()); // Ctrl-C.
process.on('SIGTERM', () => process.exit()); // Ctrl-D.
