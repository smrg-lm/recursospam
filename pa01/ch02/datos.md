# Estructuras de datos

Descarga la [Carpeta de Ejemplos](./ejemplos.zip)


## Tipos primitivos

Los tipos de datos primitivos (`null`, `undefined`, `boolean`, `number`, `bigint`, `string` y `symbol`) de JavaScript son inmutables, eso quiere decir que no se les puede cambiar el valor o sus propiedades una vez definidos. El único tipo mutable en JavaScript es `Object`, del cual deriban casi todos los demás tipos de datos (funciones, listas, diccionarios, etc.). 

```{note}
Las funciones son en sí objetos, tienen propiedades y se pueden pasar como valor.
```

Ejemplo: cuado se define una cadena no se le pueden cambiar sus caracteres, al modificar la cadena se crea un nuevo objeto cadena. El método `replace` de `String` busca y reemplaza una secuencia de caracteres y devuelve un nuevo objeto si econtró la secuencia a reemplazar pero en ningún caso modifica el objeto original. Una cadena no es un arreglo de caracteres como en C/C++ o Java.

```javascript
let c1 = 'mi cadena';
let c2 = c1.replace('mi', 'tu');
console.log(c1);  // Imprime 'mi cadena', no modificó el original.
console.log(c2);  // Imprime 'tu cadena', el nuevo objeto cadena.
```


## Objetos

Los objetos son estructuras que relacionan datos y comportamientos. Los datos de un objeto pueden variar y definen su estado interno, estos pueden ser tipos primitivos u otros objetos. Los comportamientos son las operaciones que se pueden efectuar sobre el estado de un objeto o en su interacción con otros objetos, estos están representados por funciones asociadas a los objetos que tienen acceso a sus estado interno (mediante `this`).

En JavaScript, tanto los datos como las funciones asociadas se llaman **propiedades**. Entonces, un objeto es una colección de propiedades que se representan como pares llave-valor. Las llaves son los _nombres_ con los que se acceden las propiedades y el _valor_ es el dato o función que se está accediendo.

### Objetos literales

Definición: Un literal es un valor que tiene representación sintáctica integrada en el lenguaje: `123`, `'cadena'`, `true`.

Un _objeto literal_ se define entre llaves `{}` que contienen una lista de nombres y valores separados por `:` de la siguiente manera:

```javascript
let obj = {
    nombre1: 'valor1',
    nombre2: 'valor2',
    nombre3: 123
}
```

Las funciones también pueden ser valores:

```javascript
let obj = {
    nombre1: 'dato1',
    nombre2: 'dato2',
    nombre3: function() { return 123; },  // function expression, no tiene nombre, anónima.
    nombre4: function() { return 456; },
    etc: 'etc'
}
```

Las propiedades de los objetos se acceden con el operador `.`:

```javascript
let a = obj.nombre1 + obj.nombre2;  // 'dato1dato2'
let b = obj.nombre3();  // 123
```

Los nombres de las propiedades también pueden ser cadenas o números:

```javascript
let obj = {
    'nombre1': 'valor1',
    'nombre2': 'valor2',
    3: 'valor3',
    4: 'valor4'
}
```

Las propiedades también se pueden acceder usando la notación de corchetes `obj['nombre']`. Cuando los nombres no son identificadores válidos (regla de nombres de las variables) no se pueden acceder con el operador `.` y se deben acceder con corchetes:

```javascript
let b = obj.nombre1;  // 'valor1'
let a = obj['nombre1'];  // 'valor1'
let b = obj[3];  // 'valor3'
```

Esto es así porque **los objetos son diccionarios como estructura de datos** con funcionalidad agregada. Parte de esta funcionalidad agregada son las palabras clave `this` y `super` que se suelen usar en la programación orientada a objetos. La forma sintáctica de definir métodos en objetos literales es la siguiente:

```javascript
let obj = {
    data: 2,
    metodo() { return this.data * 2; }  // Se escribe el nombre con paréntesis y llaves.
}
```

```{note}
Aún no vamos a desarrollar la programación orientada a objetos. Esto es solo una introducción a las estructuras de datos.
```


## Arreglos

Los arreglos en JavaScript son listas de elementos que pueden ser del mismo tipo o de distintos tipos. Además, son de logitud variable, no es necesario definir la capaciad de antemano y se va incrementando automáticamente a medida que agregamos valores. Esto difiere de otros lenguajes como C/C++ o Java. 

```{note}
Existen arrays con tipos homogéneos que no vamos a ver por el momento (ej. Int32Array, Float32Array).
```

Los arreglos literales se crean con corchetes como en otros lenguajes:

```javascript
const lista = ['papa', 'batata', 'lechuga', Math.PI, null, Object(), undefined];
console.log(lista);
```

Los índices de acceso a los elementos son en base cero y se usan corchetes (igual que C/C++ y Java).

```javascript
console.log(lista[0]);  // 'papa'
console.log(lista[3]);  // 3.141592653589793
```

### Métodos útiles

La cantidad de elementos se puede averiguar con la propiedad `length`.

```javascript
console.log(lista.length);  // 7
```

Los arreglos son de logitud variable, se les puede agregar elementos con el método `push` al final y `unshift` al comienzo, se les puede remover elementos con `pop` desde el final o `shift` desde el comienzo.

```javascript
console.log(lista.pop());  // Saca el último elemento y lo devuelve como valor de retorno.
console.log(lista.shift());  // Saca el primer elemento y lo devuelve como valor de retorno.
lista.push('último');  // Agrega un nuevo elemento al final y devuelve la nueva logitud como valor de retorno.
lista.unshift('primero');  // Ídem al principio.
```

Utilizando los métodos `push` y `pop` los arreglos se pueden usar como pilas.

Se pueden remover elementos del medio averiguando el índice con `indexOf` y usándolo con `splice`.

```javascript
const arr = ['a', 'b', 'c'];
const i = arr.indexOf('b');  // Devuelve la posición del elemento primer elemento igual o -1 si no está en la lista.
arr.splice(i, 1);  // Remueve solo un elemento a partir del índice i.
```

Las matrices son arreglos de arreglos:

```javascript
const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log(matrix[0][1]);  // 2
console.log(matrix[2][1]);  // 5
console.log(matrix[3][1]);  // 8
```

### Convertir cadenas en arreglos y viceversa

El método `split` de `String`:

```javascript
const cad = 'hola';
console.log(cad.split(''));  // [ 'h', 'o', 'l', 'a' ]
console.log(cad.split('o'));  // [ 'h', 'la ]
```

El método `join` de `Array`:

```javascript
const arr = ['c', 'h', 'a', 'u'];
console.log(arr.join(''));  // 'chau'
```


## Conjuntos

Los conjuntos con colecciones de objetos que no se pueden repetir, a diferencia de los arreglos. Se crean con el objeto `Set`. Para crear un objeto a partir de una clase se debe usar el operador `new` que construye al objeto.

```javascript
let conj = new Set(['uno', 2, 'ocho']);
console.log(conj);  // Set { 'uno', 2, 'ocho' }
```

Los valores se pueden agregar inicializando con un arreglo o luego con el método add y los objetos del conjunto se guardan en el orden de inserción. Si a un conjunto le queremos agregar un valor duplicado no hace nada, lo ignora por ya está dentro.

```javascript
let conj = new Set();

conj.add('uno');
conj.add(2);
conj.add('ocho');
conj.add('uno');  // No hace nada, la cadena 'uno' ya está en el conjunto.
console.log(conj);  // Set { 'uno', 2, 'ocho' }

conj.delete('uno');  // Los elementos se puede quitar con delete.
console.log(conj);  // Set { 2, 'ocho' }
```

Se puede preguntar si un objeto/valor pertenece al conjunto con el método `has`:

```javascript
let conj = new Set(['uno', 2, 'ocho']);
console.log(conj.has('uno'));  // true
console.log(conj.has(8));  // false
```

Lamentablemente en la librería estándar no etán definidas las operaciones entre conjuntos (unión, intersección, diferencia, etc.) pero [en este enlace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#implementing_basic_set_operations) hay un ejemplo de sus implementaciones.


## Diccionarios (Map)

Los diccionarios son objetos que contienen llaves que referencian a valores, como los diccionarios de palabras contienen palabras que apuntan a direcciones. Cada llave es única. En JavaScript a los diccionarios de les llama `Map`, supongo que porque hace un _mapping_ entre llave y valor mediante una _tabla de hash_ que deine una estructura que se llama _array asociativo_.

Los _map_ son similares a los objetos, asocian llaves con valore y nos sirven para guardar cosas de manera ordenada, pero los objetos tienen funcionalidad y propiedades agregadas (por ejemplo se le pueden crear métodos y tienen prototipos y toda la lógica de esas cosas). Además, a diferencia de los objetos `Map` las llaves pueden ser cualquer tipo de objeto (en los objetos solo pueden ser cadenas o síbmolos). Muchas veces en conveniente usar objetos literales en ves de `Map` porque la sintáxis es más cómoda.

```javascript
const dic = new Map([['uno', 1], ['dos', 2], ['tres', 3]]);
console.log(dic)  // Map { 'uno' => 1, 'dos' => 2, 'tres' => 3 }
```

Las llaves y los valores se pueden agregar individualmente con el método `set`. Lo mismo se puede hacer para que devuelva el valor de una llave con `get` o corchetes.

```javascript
const dic = new Map();
dic.set('uno', 1);
dic.set(2, 'dos');
console.log(dic)  // Map { 'uno' => 1, 2: 'dos' }
console.log(dic.get('uno'))  // 1
console.log(dic.get(2))  // 'dos'
```

```{note}
No se debe usar la notación de corchetes `dict['llave']` porque estaríamos accediendo a la propiedad del objeto `Map` y no a sus llaves como estructura de datos.
```

Se puede preguntar por una llave con `has` y borrarla con `delete`:

```javascript
const dic = new Map();

dic.set('uno', 1);
dic.set(2, 'dos');
console.log(dic.has('uno'));  // true
console.log(dic.has('dos'));  // false

dic.delete('uno');
dic.delete(2);
console.log(dic)  // Map { }
```

Al iguale que en los conjuntos el contenido se guarda en orden de inserción, esto es importante cuando se usan estructuras iterativas.


## JSON

La voz _JSON_ (se pronuncia algo así como _yeyson_) es el acrónimo de **J**ava**S**ctip **O**bject **N**otation. Es una representación, en formato texto, estándar de estructuras de datos basada en la notación de objetos literales de JavaScript.

Los datos escritos en formato JSON se guardan en archivos con la extensión `.json`. Una cadena de caracteres que representa una estructura de datos en formato JSON se suele utilizar como el dato a transmitir entre aplicaciones web. Una aplicación lo codifica a partir de un objeto JS y lo envía a otra que lo recibe y lo decodifica como ojeto JS.

Utiliza un conjunto más limitado de _tipos_. En realidad es todo texto pero cuando se parsea se convierte en un conjunto limitado de objetos JavaScript: objetos literales con llaves (que se escriben con string de comilla doble) y valores separados por dos puntos y coma (`{ "a": 1, "b": 2 }`), arrays (`[]`), strings que se escriben con comillas dobles (`"abc"`), buleanos (`ture` o `false`), y números (`123`, `1e-2`).

Los objetos y los arrays pueden contener otros objetos y arrays. El siguiente ejemplo es un objeto que contiene valores, listas y otros objetos:

```json
{
    "campo uno": 123,
    "campo dos": 1e-2,
    "array": [1, 2, 3],
    "objeto": {
        "nombre": "Cuadrado",
        "pos": { "x": 0, "y": 0 },
        "size": 10
    },
    "buleano": true
}
```

Una cadena JSON puede ser un array de valores y objetos:

```json
[
    {
        "a": 1,
        "b": 2
    },
    {
        "c": 3,
        "d": 4
    }
]
```

Un número o una cadena también puede ser una cadena JSON válida, por ejemplo un archivo JSON que contiene lo siguiente:

```json
"soy un dato JSON que consta de solo una cadena que contiene palabras"
```

O un archivo que contiene solo un número:

```json
123.456
```

### Conversión JavaScript a JSON y viceversa

JavaScript tiene incorporado el objeto `JSON` (similar al objeto `Math`) que provee métodos para esto. Solo tiene dos `stringify` y `parse`.

El método `stringify` convierte objetos JavaScript en cadenas JSON.

```javascript
// Objeto JavaScript
let obj = { x: 0, y: 0, lista: [1, 2, 3] };
// Cadena JSON
let str = JSON.stringify(obj);
// Test
console.log(str);  // {"x":0,"y":0,"lista":[1,2,3]} 
```

El método `parse` parsea cadenas json y las convierte en objetos JavaScript:

```javascript
// Cadena JSON
let str = `{ "x": 0, "y": 0, "lista": [1, 2, 3] }`
// Objeto JavaScript
let obj = JSON.parse(str);
// Test
console.log(obj);  // { x: 0, y: 0, lista: [ 1, 2, 3 ] }
console.log(obj.x);  // 0
console.log(obj.lista[0])  // 1
```

No hay más, es solo eso.

En futuros ejemplos vamos a ver que _p5.js_ convenientemente tiene funciones llamadas `loadJSON` y `saveJSON` para trabajar con _JSON_.


## Enlaces

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON

Recomendación: si quieren estudiar todo el lenguaje más en profundidad pueden seguir las muy buenas guías didácticas que hay en: https://developer.mozilla.org/en-US/docs/Learn/JavaScript#modules y me pueden traer preguntas si quieren.
