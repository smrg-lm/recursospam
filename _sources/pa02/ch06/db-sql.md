# Bases de datos

Existen varios modelos de bases de datos y su teoría es bastante extensa. Aquí solo vamos a ver sus principios básicos de manera práctica.

- Bases de datos relacionales (Bases de datos SQL)
- Bases de datos no relacionales (MongoDB)

Las bases de datos se utilizan para guardar información persistente en dentro de un sitio web utilizando distintos tipos de datos y estructuras que orgnizan esos datos.

...

Las bases de datos son archivos, posiblemente binarios aunque también pueden ser archivos de texto, que contienen y manipulan información de manera eficiente.

Las bases de datos se manipulan mediante aplicaciones especializadas (DBMS) que pueden estar basadas en la arquitectura cliente servidor.

Dentro de las bases de datos se almacenan estructuras de datos, llamadas _tablas_, que básicamente organizan la información en filas y columnas.

...

Ejemplos de tablas en el pizarrón o la compu, analogía con las hojas de cálculo.

- Registros (filas)
- Campos (columnas)
- Tipos de datos (entero, real, cadena de caracteres, datos binarios, etc.)
- Tipos de llaves (llave primaria, _rowid_ por defecto en sqlite)


# Lenguaje SQL

Para almacenar datos y hacer consultas en bases de datos, históricamente se utilizan lenguajes de dominio específico. El lenguaje que vamos a utilizar de llama SQL (se suele pronunciar "_si-kiu-el_").

SQL son las siglas en inglés de _Structure Query Language_ que se traduce como Lenguaje de Consulta Estructurado. Es un lenguaje de programación de dominio específico estándar para la manipulación de bases de datos _relacionales_.

Con este lenguaje se pueden acceder y manipular datos dentro de los principales sistemas de bases de datos como MySQL, SQL Server, Access, SQLite y muchos más.

Para utilizar SQL debemos tener un _Sistema de Gestion de Bases de Datos_, conocido de manera abreviada como RDMS (_Relational Database Management System_ en inglés). Es el software que se encarga de implementar la lógica de la interacción y el almacenamiento en las bases de datos.

En vez de instalar una aplicación RDMS en el systema operativos vamos a utilizar el módulo npm [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) que viene con los binarios de la RDMS [SQLite](https://sqlite.org) para utilizarlos directamente desde Node.js en distintos sistemas operativos (Windows, Linux y Mac).

> Nota: De esta manera, nuestro sitio web va a ser una aplicación que contiene todos los recursos de los que depende (el stack completo). Esto es característico de Node.js y facilita tanto de desarrollo como el despliegue de sitios web.

> Nota: Al tratarse de un paquete de node que vienen compilado para cada SO no es posible compartir los módulos junto con el proyecto. Incluso, hay paquetes que se descargan y see compilan en la máquina de destino.


# Creación de bases de datos

En los RDMS que funcionan como aplicaciones independientes es necesario crear las bases de datos mediante el siguiente comando SQL:

```sql
CREATE DATABASE miDB
```

Luego vamos a ver que al utilizar el módulo `better-sqlite3` esta acción se realiza al crear una instancia de la base de datos.

Las bases de son archivos que contienen las _tablas_.


# Creación de tablas

Una **tabla** es una _colección de registros_ de datos.

Las filas de la tabla son los **registros** que tienen una cantidad de **campos** definidos según el diseño de la tabla. Una tabla es una colección de registros. Los campos son los datos que almacenamos y equivalen a las columnas de la tabla.

Una base de datos puede tener más de una tabla, y cada tabla se identifica con un **nombre** único (`usuarios`, `materiales`, `imagenes`, etc).

Por ejemplo:

| id   | nombre     | apellido    | dirección        | ciudad     |
|:----:|:----------:|:-----------:|:----------------:|:----------:|
| 1    | Ariel      | Ramirez     | Calle Falsa 123  | La Tapla   |
| 2    | Gustavo    | Leguizamón  | Salta 789        | La Linda   |
| 3    | Liliana    | Herrero     | Rosario 1950     | La Nilda   |

Esta tabla contiene tres registros, uno para cada persona, y cinco campos, con información extra como un numero identificador, nombre, apellido, etc. Esta tabla la llamamos `personas`.

Para crear una tabla se utiliza la sentencia CREATE TABLE, pero ademas debemos indicar que tipo de informacion va a guardar esta tabla, con la siguiente sintaxis:

```sql
CREATE TABLE personas(lista de campos con tipo)
```

```sql
CREATE TABLE personas
(
nombre_del_campo tipo_de_dato,
nombre_del_campo tipo_de_dato,
nombre_del_campo tipo_de_dato,
)
```

Lo que estamos creando con este comando es el formato de las columnas que va a tener la tabla.

Siempre es necesario diseñar previamente la tabla que queremos y especificar los tipos de datos que vamos a manejar en cada campo.


# Tipos de datos

Cada campo debe definir qué tipo de dato va a almacenar, de texto, numéricos, fechas, binarios, etc. A continuación se listan los tipos de datos más comunes para texto, binarios, números y fechas.

Tipos de datos para manejar texto:

- CHAR(size): Cadena de caracteres fija según size (letras, números y caracteres especiales). Máximo 255 caracteres.
- VARCHAR(size): Cadena de caracteres variables (letras, números y caracteres) con tamalo maximo especificado entres parentesis. Maximo 255 caracteres.
- TINYTEXT: Cadena con un máximo de 255 caracteres.
- TEXT: Cadena con un máximo de 65535 caracteres.
- MEDIUMTEXT: Una cadena de caracteres de hasta 16777215 caracteres.
- LONGTEXT:Cadena de caracteres de hasta 4,294,967,295.

Tipo de datos para objetos binarios:

- BLOB: Tipo de datos para BLOBs (objetos binarios largos, imagenes, audio). Hasta 65535 bytes de datos.
- MEDIUMBLOB: Para BLOBs de hasta 16777215 bytes de datos
- LONGBLOB: Para BLOBs de 4,294,967,295.

Tipos de datos compuestos:

- ENUM(x, y, z, ...): Este tipo permite manejar una serie de posibles valores. Se pueden guardar listas de hast 65535 valores.
- SET: Igual que el anterior solo que puede contener listas de 64 valores.

Tipos de datos para manejar números:

- TINYINT(size): Números desde -128 a 127. Desde desde 0 a 255 si se usa UNSIGNED. Dígitos con size.
- SMALLINT(size): Números desde -32768 a 32767. Desde 0 a 65535 con UNSIGNED. Dígitos con size.
- MEDIUMINT(size): números desde -8388608 a 8388607. Desde 0 a 16777215 con UNSIGNED. Dígitos con size.
- INT(size): Números desde -2147483648 a 2147483647. Desde 0 a 4294967295 con UNSIGNED. Dígitos.
- BIGINT(size): -9223372036854775808 a 9223372036854775807. 0 a 18446744073709551615 con UNSIGNED*. Dígitos con size.
- FLOAT(size,d): Un pequeño numero con decimales (d=decimales). Dígitos con size.
- DOUBLE(size,d): Un número grande con decimales (d=decimales). Dígitos con size.
- DECIMAL(size,d): Un número del tipo DOUBLE guardado como un String. d=decimales, size=Dígitos.

Tipos de datos para manejar fechas:

- DATE(): Una fecha con formaro YYYY-MM-DD. Desde '1000-01-01' a '9999-12-31'.
- DATETIME(): Combinación entre fecha y hora con el formato YYYY-MM-DD HH:MM:SS. Desde '1000-01-01 00:00:00' a '9999-12-31 23:59:59'.
- TIME(): Horario con el formato HH:MM:SS '-838:59:59' to '838:59:59'
- YEAR: Año en formato de dos o cuatro dígitos.


# Creación de tablas con tipos

Supongamos que queremos crear la tabla que vimos antes, la de los nombres. Para eso utilizamos como vimos la sentencia CREATE TABLE.

```sql
CREATE TABLE personas
(
id INT,
nombre VARCHAR(255),
apellido VARCHAR(255),
direccion VARCHAR(255),
ciudad VARCHAR(255)
)
```

Se entiende claramente como vamos armando las tablas de manera facil con los tipos de datos.

# Acceso y modificación de los datos

## Inserción

Ahora pasaremos a ver las funciones para insertar, borrar y consultar datos de una tabla.

Para **insertar** nuevos registros en una tabla usamos la sentencia `INSERT INTO`.

```sql
INSERT INTO nombre_tabla ...
```

Los valores se pasan como lista separada por comas luego de la instrucción `VALUES`.

```sql
INSERT INTO nombre_tabla VALUES (v1, v2, v3, ...)

INSERT INTO personas VALUES (1, 'Ariel', 'Ramirez', 'Calle Falsa 123', 'La Ciudad')
```

Las inserciones se pueden hacer de dos maneras, especificando directamente todos los valores de los campos para que cree un registro, como en el ejemplo de arriba, o especificando los campos con los que se quiere inicializar el registro.

Para crear un registro especificando solo algunos campos de deben enumerar como lista luego del nombre de la tabal:

```sql
INSERT INTO personas (id, apellido, ciudad) VALUES (v1, v2, v3)
```

Nota: Salvo que se especifique lo contraio al crear la tabla, los campos a los que no se les asigne valor al crear el registro tienen por defecto el valor `NULL`.


## Selección

Para obtener los datos almacenados en la base de datos se utiliza la instrucción `SELECT` seguida por una lista separada por comas con los nombres de los campos cuyos valores va a retornar y luego se especifica la talba con `FROM`. Por ejemplo:

```sql
SELECT nombre, apellido
FROM personas
```

La expresión de arriba nos va a devolver un listado con el nombre y el apellido de todos los registros de la tabla `personas`.

Si quisieramos seleccionar todos los campos de todos los registros se puede utilizar el comodín `*` en vez de los nombres de los campos:

```sql
SELECT * FROM personas
```

La expresión de arriba nos va a devolver un listado de todos los registros con todos los valores de todos los campos.


## Actualización

Para actualizar los valores de los registros de una tabla se utiliza la instrucción `UPDATE` y se deben especificar los campos con la instrucción `SET` y seleccionar el registro con la instrucción `WHERE`.

En el siguiente ejemplo cambiamos el `nombre` y el `apellido` el registro cuyo `id` vale `1`.

```sql
UPDATE personas
SET nombre='Pepe', apellido='Pipi'
WHERE id=1
```

Los valores de los campos los especifiamos como una lista de asignaciones separadas por coma luego de la palabra `SET`, de la siguiente forma `campo=valor`.

El registro a modificar que usamos junto a `WHERE` es el que tiene `1` como valor de `id` en este caso. Esto es para indentificar un registro inequivocamente, el `id` debe ser único por diseño.

**Si no usáramos `WHERE`**, por ejemplo:

```sql
UPDATE personas
SET nombre='Pepe', apellido='Pipi'
```

**Se cambian todos los registros** de la tabla con el mismo valor para los campos definidios en `SET`. En el caso de arriba todas las personas se pasarían a llamar _Pepe Pipi_. Ojo, cuidado con esto, justo estos son campos que no deberían ser iguales para todos las personas, pero esto puede ser necesario para resetear algún campo en particular, algún estado, para todos los registros.


## Borrado

Para borrar un registro se utiliza la instrucción `DELETE FROM` especificando la tabla y se debe identificar el registro con `WHERE` según alguno de sus campos.

```sql
DELETE FROM personas
WHERE nombre='Pepe'
```

Pero ojo, pueden haber dos personas con el mismo nombre y apellido. Por eso es importante encontrar el `id` o definir campos únicos como veremos luego.

Si queremos eliminar todos los registros de una tabla se puede hacer simplemente sin el `WHERE`:

```sql
DELETE FROM personas
```

O

```sql
DELETE * FROM personas
```

Ojo con estas expresiones, si se omite `WHERE` podemos hacer macana fácilmente.


## Búsqueda

En casos anteriores para especificar que columna setear pero también se puede utilizar para otras sentencias, por ejemplo para seleccionar datos que cumplan un criterio. En este caso se necesita especificar `SELECT` para definir los campos y `WHERE` para elegir los registros según el valor de algún campo.

```sql
SELECT campo1, campo2, ...
FROM nombre_tabla
WHERE campoN operador valor
```

Por ejemplo:

```sql
SELECT nombre, apellido
FROM personas
WHERE ciudad='La Nilda'
```

Lo que devuelve el nombre y apellido de todos los registros cuyo campo _ciudad_ es igual a `'La Nilda'`.

Los operadores que se pueden usar con `WHERE` son:

- `=` Igual
- `<>` Distinto
- `>` mayor que
- `<` menor que
- `>=` mayor o igual que
- `<=` menor o igual que
- `BETWEEN` entre un rango
- `LIKE` busqueda de patrones
- `IN` entre posibles valores específicos

Al usar where se pueden combinar más operaciones con los operadores lógicos `OR`, `AND`, `NOT`. SQL también incluye funciones y otro tipo de funcionalidad que veremos luego.


# Enlaces

https://www.w3schools.com/sql/default.asp
