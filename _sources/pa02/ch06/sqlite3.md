# Paquete better-sqlite3

La librería [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) provee el motor de [SQLite](https://sqlite.org/index.html) y una API **sincrónica** para trabajar con bases de datos en Node.js.

Documentación de la API en línea:

https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md

Esta librería actúa como RDMS (_Relational Database Management System_ en inglés) y nos simplifica la instalación. Todos los principios de SQL se aplican y su API, al ser **sincrónica** nos simplifica muchas cosas por el momento.


# Usando better-sqlite3

Crear un carpeta llamada `testsqlite3` y situarse en ella:

```bash
mkdir testsqlite
cd testsqlite
```

Iniciar el paquete npm:

```bash
npm init -y
```

Crear el archivo `app.js` dentro de la carpeta.

```bash
touch app.js
```

Definir el script `"start"` en `package.json`:

```json
  "scripts": {
    "start": "node app.js"
  },
```

Instalar el paquete `better-sqlite3`:

```bash
npm i better-sqlite3
```

**Explicar testsqlite3/app.js**


# Creando tablas con better-sqlite3

Los ejemplos de la carpeta `tablas` los voy a ir mostrando y explicando secuencialmente en la clase utilizando el archivo `app.js`. Son cuatro ejemplos (`app1` hasta `app4`) en los que se va explicando la SQL y la API de `better-sqlite3`. La teoría está los comentarios del código.

Si no los hicieron en clase, los archivo `app<num>.js` son scripts con ejemplos de la lógica de la base de datos para hacer pruebas, luego en otros proyectos la vamos a poner en scripts a parte. Para evaluar los ejemplos se puede ejecutar el comando `node` en vez de `npm`:

```bash
node app3.js
```

Pero tengan en cuenta que les va a imprimir todo junto. Son para ir probando las cosas de a una. En muchos casos los ejemplos dependen del estado del código de más arriba.

En clase: crear un carpeta llamada `tablas` para el proyecto en el escritorio y seguir los pasos de la sección de arriba hasta la instalación de `better-sqlite3`.
