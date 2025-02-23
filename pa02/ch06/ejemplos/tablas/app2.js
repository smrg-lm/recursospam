// Importa el módulo better-sqlite3.
const Database = require('better-sqlite3');
// Crea la base de datos en memoria.
const db = new Database(':memory:', { verbose: console.log });

// La misma tabla de la teoría.
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
 * La API de la librería `better-sqlite3` define solo tres
 * clases para su uso:
 * 
 * Database
 * Statement
 * SqliteError
 * 
 * La clase `Database` es la que obtenemos al importar el módulo
 * y es la que se usa para generar las otras dos. Al preparar una
 * consulta el método `Database.prepare` retorna un objeto
 * Statement.
 */

let stmt = db.prepare("INSERT INTO personas VALUES (1, 'Ariel', 'Ramirez', 'Calle Falsa 123', 'La Tapla')")
console.log('stmt es un objeto', stmt.constructor.name);  // Imprime stmt es un objeto Statement.

/**
 * Una vez que se tiene el objeto Statemnt se pueden hacer varias
 * consultas iguales con él.
 */

stmt.run();
stmt.run();
stmt.run();

/**
 * La repetición de arriba no tiene mucho sentido así como está
 * pero poder tener un objeto Statement con una consulta fija
 * puede servir para no tener que estar creando los objetos todo
 * el tiempo. Por ejemplo, si queremos consultar toda la tabla
 * para imprimir su contenido en pantalla la consulta es siempre
 * la misma y podemos tener el objeto Statement que hace esa
 * consulta para usarlo dentro de una función.
 */

stmt = db.prepare("SELECT * FROM personas");
console.log('Todos los datos de la tabla:', stmt.all());

/**
 * El tercer objeto que define la API es SqliteError.
 * Este es el objeto se genera cuando sucede un error
 * en la consulta.
 */

try {
    console.log('*** va el error');
    stmt = db.prepare("SELECT + FROM personas");  // Error + en vez de *.
} catch(err) {
    console.log(err.name, err.message);
}

/**
 * Los objetos Statement definen tres métodos para
 * hacer consultas que vamos a usar.
 * 
 * - run
 * - get
 * - all
 * 
 * Cada uno de estos métodos realiza una consulta y
 * retorna un objeto pero difiere en los valores de
 * ese objeto.
 */

/**
 * El método `run` ejecuta la consulta y retorna el estado
 * de la base de datos, cuántos cambios se hicieron y cuál
 * fue la última fila insertada. Estos datos sirven para controlar
 * el funcionamiento pero no los vamos a usar.
 */

let ret = db.prepare("SELECT * FROM personas").run();
console.log(ret);  // { changes: 0, lastInsertRowid: 3 }

/**
 * Los método `get` y `all` sirven obtener los valores de
 * las consulta que deberían devolver un solo resultado
 * o varios respectivamente.
 * 
 * El objeto que retorna `get`
 * representa un registro de la tabla con cada nombre de
 * campo y valor, igual a como está en la base de datos.
 * 
 * En el ejemplo de abajo, la consulta es por todos los
 * registors de la tabla, pero `get` va a devolver solo
 * el primero que encuentra.
 */

ret = db.prepare("SELECT * FROM personas").get();
console.log(ret);  // { id: 1, nombre: 'Ariel', apellido: 'Ramirez', direccion: 'Calle Falsa 123', ciudad: 'La Tapla' }

/**
 * Un tipo de consulta de que esperaríamos un solo resultado
 * es el de una llave única (cuyo valor no se puede repetir
 * en ningún otro campos de un columna), por ejemplo un
 * hipotético nombre de usuario:
 * 
 * SELECT username FROM personas WHERE username = 'pepe123'
 * 
 * En ese caso sabemos que hay uno o no hay ninguno y necesitamos
 * un solo valor en cualquier caso. También pueden haber otros
 * casos en los que con que haya una entrada con un valor ya
 * nos de información.
 */

/**
 * Por último, el método `all` devuelve un array de objetos
 * que representan los registros de la base de datos.
 */

ret = db.prepare("SELECT * FROM personas").all();
console.log(ret); // [ { id: ..., nombre: ... }, { ... }, { ... } ]



// Siempre cerrar la conexión, apagar, al terminar.
// ste código sirve luego para el servidor express.
process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit()); // Cierre de la terminal.
process.on('SIGINT', () => process.exit()); // Ctrl-C.
process.on('SIGTERM', () => process.exit()); // Ctrl-D.
