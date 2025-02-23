// Importa el módulo better-sqlite3.
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Abre/crea una base de datos en disco rígido.
const db = new Database('users.db', { verbose: console.log });
// Carga el script sql para crear la tabla users.
const file = fs.readFileSync(path.join(__dirname, 'create_users.sql'), 'utf-8');
// Crea la tabla si no existe, `exec` es lo mismo que `run` pero se usa para hacer varias cosas de uan.
db.exec(file);

// Inserción de prueba.
// db.prepare("INSERT INTO users VALUES ('loli97', 'lilianah@email.com', 'clave123')").run();
// let ret = db.prepare('SELECT rowid, * FROM users').all();
// console.log(ret);


function imprimir() {
    let data = db.prepare('SELECT rowid, * FROM users').all();
    console.log(data);
}

function registrar(username, email, password) {
    let stmt = db.prepare('SELECT username FROM users WHERE username=?');
    let value = stmt.get(username);
    if(!value) {
        stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?)");
        stmt.run(username, email, password);
    } else {
        console.log(`El usuario "${username}" ya existe`)
    }
}

registrar('lennon', 'leni2023', '1234566');
imprimir();


module.exports = {
    imprimir,
    registrar
}

/**
 * TP: Crear un módulo a partir de este archivo que contenga dos funciones.
 * a exportar. Una que inserte usuariosy otra imprima la base de datos en la
 * consola. Luego seguir los pasos para crear el proyecto express con el formulario
 * de la clase pasada que están en práctica.md.
 */


// PONER CADA COSA EN SU FUNCIÓN PARA HACER UN MÓDULO.

// Siempre cerrar la conexión, apagar, al terminar.
// ste código sirve luego para el servidor express.
process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit()); // Cierre de la terminal.
process.on('SIGINT', () => process.exit()); // Ctrl-C.
process.on('SIGTERM', () => process.exit()); // Ctrl-D.
