const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

/**
 * Crear/abrir la base de datos con la clase y el script.
 */
const db = new Database('user.db', { verbose: console.log });
const filename = path.join(__dirname, 'create_user.sql');
const file = fs.readFileSync(filename, 'utf-8');
db.exec(file);


/**
 * Cerrar la base de datos al terminar el proceso de la app servidor.
 * SIGHUP, SIGINT y SIGTERM son tres señales posibles del SO.
 */
process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));


/**
 * Imprime el contenido de la base de datos.
 */
exports.log = () => {
    let data = db.prepare('SELECT rowid, * FROM users').all();
    console.log(data);
};

/**
 * Comprueba si el nombre de usuario existe en la base de datos.
 *
 * @param {string} username
 * @returns boolean
 */
exports.userExists = (username) => {
    let stmt = db.prepare('SELECT username FROM users WHERE username=?');
    let value = stmt.get(username);
    if(!value) return false;
    else return true;
};

/**
 * Agrega un nuevo usuario en la base de datos.
 * ¡El usuario no debe existir!
 *
 * @param {string} username
 * @param {string} email
 * @param {string} hash
 */
exports.addUser = (username, email, hash) => {
    stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?)");
    stmt.run(username, email, hash);
}
