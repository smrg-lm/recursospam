# Estructuras de control

Para un instroducción un poco más expresiva ver _Apunte Introductorio Lenguajes.pdf_.


## Secuencial

La estructura secuencial está representada por los bloques de código que se escriben entre llaves pero dentro contiene sentencias en vez de llaves y valores.

```javascript
{
  // Esto es un bloque de código entre llaves.
  let x = 123;
  console.log(x);
}
```
Los bloques de código se usan para las las estructuras de control cuando estos contienen más de una sentencia. Además de agrupar sentencias **definen el alcance** de las variables definidas con `let` y `const`.

```javascript
let x = 123;
let y = 456;

{
  // La redefinición de `x` no tira error porque ensombrece la declaración del bloque externo.
  let x = 789;
  console.log(x, y);  // 789 456
}

console.log(x, y);  // 321 456
```

En las siguientes estructuras, las variables que se definen dentro de la sintáxis de cada una tienen alcance solo dentro del bloque que definen. Distintos sería el caso de `var` que tienen alcance de función (**no usar var**).


## Iterativas

El ciclo for es igual que en otros lenguajes, la variable contador se puede definir con `let` o `const` lo que hace que sea local al bucle (recomendado, usar siempre `let` o `const`.). Los ciclos for se usan cuando la cantidad de veces a iterar es conocida.

```javascript
let arr = [1, 'dos', {}];

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

Cuando la cantidad de repeticiones no se puede saber de antemano se usa el ciclo `while`.

```javascript
function calcCond() { return Math.random() > 0.5; }

while(calcCond()) {
  console.log('sigue');
}

console.log('termina');
```

**Pero, ojo, no podemos usar esta estructura de control dentro de `draw` así no más porque el programa puede quedar trabado cada vez que llegue al loop.**

También existe _do-while_, a diferencia de `while` ejecuta al menos una vez el bloque de código.

```javascript
function calcCond() { return Math.random() > 0.5; }

do {
  console.log('sigue');
} while(calcCond());

console.log('termina');
```

De los bucles se puede salir con `break` o saltar una iteración con `continue`. También se pueden [etiquetar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#labeled_statement) (para salir desde bucles anidados).

### Estructuras iterables (colecciones)

Hay estructuras de datos como `Array`, `Map` y `Set` que implementan el protocolo iterativo, que no vamos a ver por el momento, pero eso sirve para que podamos iterar sobre los valores de una colección con un ciclo `for...of`.

Como iteramos sobre objetos contenidos se usa `const` en vez de `let` al definir la variable que almacena el valor en cada iteración, porque no tine mucho sentido cambiarle el valor y eso previene errores en el código.

TODO: Breve explicación de areglos, diccionarios y conjuntos.

Ejemplo con arreglos:

```javascript
const arr = ['una', 'dos', 'tres'];

for (const item of arr) {
  console.log(item);
}
```

Ejemplo con conjuntos:

```javascript
const conj = new Set(['una', 'dos', 'tres']);

for (const item of conj) {
  console.log(item);
}
```

Ejemplo con diccionarios:

```javascript
const dic = new Map([['uno', 1], ['dos', 2], ['tres', 3]]);

for (const items of dic) {
  console.log(items[0], items[1]);
}
```

El método estático `Object.entries` devuelve un iterable (en forma de map/diccionario) de las propiedades del objeto y se puede usar de la misma manera. Puede ser más cómodo crear objetos como si fueran maps por el atajo sintáctico pero hay que tener en cuenta que los objetos tiene propiedades agregadas.

```javascript
const obj = {uno: 1, dos: 2, tres: 3};

for (const items of Object.entries(obj)) {
  console.log(items[0], items[1]);
}
```

También se puede _desestructurar_ el par llave-valor al iterar:

```javascript
const obj = {uno: 1, dos: 2, tres: 3};

for (const [llave, valor] of Object.entries(obj)) {
  console.log(llave, valor);
}
```

```{note}
Existe la estructura `for..in` que no vamos a usar.
```


## Condicionales

La alternativa condicional se escribe casi igual que en C/C++ o Java. Aunque todos los tipos en JavaScript definen su valor de verdad, para las variables de las condiciones vamos a utilizar solo _números enteros_ y _valores booleanos literales_ como aprendieron en otros lenguajes.

```javascript
let cond = true;

if(cond) {
  console.log('verdadero');
} else {
  console.log('verdadero');
}
```

Las alternativas se pueden encadenar con `else if` y el bloque `else` se puede omitir.

También existe la estructura `switch` para comparar entre distintos valores:

```javascript
let value = 'uno';

switch(value) {
  case 'uno':
    console.log('es uno');
    break;  // Es obligatorio poner break para que no se evalúen otros casos.
  case 'dos':
    console.log('es dos');
    break;
  default:  // Caso por defecto, se puede omitir si no se hace nada.
    console.log('no es ninguno');
}
```

Dentro de las expresiones condicionales no se debe asignar valores a las variables (no usar el operador `=`). También es importante hacer comparaciones entre variables del mismo tipo salvo casos espciales (pero en principio lo considero un error).

Recuerden que los valores liberales no son lo mismo que el objeto que los envuelve. Por defecto, un objeto (de intancia o clase) es considerado verdadero como valor buleano, así se diferencia de `undefined` o `null`, salvo una cadena vacía que es falso. Los valores `0` o `NaN` también tienen valor de verdad falso.

```javascript
let valor = new Boolean(false)

if(valor) {
  console.log('Yo pensaba que era falso pero es un objeto Boolean e hice macana.')
}
```


## Enlaces

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling
