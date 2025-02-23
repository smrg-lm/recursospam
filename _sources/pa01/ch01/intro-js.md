# Recursos de JavasScript utilizados

## Introducción

JavaScript es el lenguaje de la web (del lado del cliente). Es uno de los lenguajes más usados en el mundo. No es perfecto, fue pensado para un dominio específico que fue variando y madurando con los años. El proceso de estandarización fue algo complicado en sus comienzos por la competencia entre distintas empresas. Varias APIs no se estandarizaron rápidamente y la compatibilidad entre navegadores era todo un problema. Aún los sigue siendo, en menor medida, porque no todos los navegadores implementan todas las características de los estandar más nuevos. Pero sus implementaciones, estandarización y la documentación han mejorado mucho en los últimos años. Algunos aspectos del lenguaje, que son muy difíciles de cambiar por problemas de compatibilidad hacia atrás, suelen ser reprochables, por ejemplo, su tipado débil, coherción de tipos, y ciertas ambigüedades o complejidades en relación con la programación orientada a objetos, por ejemplo, la sobrecarga del operador `+` o de las funciones como contructores de ojetos y cieras complejidades conceptuales que surgen al implementar múltiples paradigmas y mantener sintaxis heredada. Pero la web no se puede romper.

Según su definición más común es un lenguaje de tipado dinámico, basado en prototipos y orientado a objetos. Su estandarización se llama _ECMAScript_ (estándar [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)) y depende la organización _Ecma International_ que originalmente se llamaba _European Computer Manufacturers Association_ (ECMA). El nombre _JavaScript_ es marca registrada de Oracle.

Debido a que mantener la compatibilidad hacia atrás y entre navegadores es un problema difícil de solucionar, en la actualidad se usa mucho los compiladores de código a código (transpiladores) que se implementan en distintos _frameworks_ (generalmente se usa la librería Babel para esto). Esto también dió lugar a la implementación de otros lenguajes relacionadas a JavaScript como TypeScript, CoffeScript o la creación de extensions del lenguaje en distintos _frameworks_ (ej. React), lo cual puede hacer que las cosas sean un poco más confusas, por eso lo aclaro.

La versión del estándar que vamos a utilizar es **ES6+**, 2015 o posterior, siempre y cuando esté soportado al menos por Firefox y Chrome.

Al ser un lenguaje interpretado, JavaScript depede de un programa intérprete que compile y ejecute el código dentro de un entorno de ejecución. Los entornos de ejecución (_scripting engines_ o _javascript engine_ en este caso) son programas que corren en los navegadores por cada página web/pestaña o, más recientemente, como programa de línea de comandos (ej. Node.js) que pueden ser utilizados del lado del servidor.

Además de ser un lenguaje interpretado, el entorno de ejecución de JavaScript está orientado hacia un contexto de ejecución específico: los navegadores. Por eso, al ejecutar código en un navegador las funciones de entrada/salida (IO por sus siglas en inglés) están limitadas a las abstracciones que brinda la aplicación. Por ejemplo, para imprimir mensajes se debe usar el método `log` del objeto `console`, para mostrar información en pantalla se debe usar el objeto `docuement` a través de la interfaz DOM (document objet model) y el manejo de la pestaña/ventana en que se ejecuta el script se hace a través del objeto `window` que a su vez es el *objeto global* que representa el contexto de ejecución del programa en el navegador. **Todas estas cuestiones las vamos a ir viendo y aclarando a medida que las vayamos necesitando**.

```{note}
Todo lo que se ve en estas secciones se puede probar en la consola del navegador.
```

### Enlaces

https://en.wikipedia.org/wiki/JavaScript

https://en.wikipedia.org/wiki/ECMAScript

https://en.wikipedia.org/wiki/Source-to-source_compiler

https://en.wikipedia.org/wiki/TypeScript

https://en.wikipedia.org/wiki/CoffeeScript

https://developer.mozilla.org/es/docs/Web/JavaScript

https://developer.mozilla.org/es/docs/Learn/Front-end_web_developer


## Tipos de datos primitivos

Los tipos de datos con los que nos podemos encontrar en esta clase son los siguientes:

- number: enteros y de puento flotante: `10`, `0.1`, `1e-3`, etc.
- string: como literal escrito entre comillas simples o dobles: `'esto es un string'`, `"esto también"`. Las cadenas están en formato UTF-16 por estandar pero se usa UTF-8 en los archivos fuente (8 y 16 refiere a grupos de bits, llamados _code unit_, UTF-8 puede usar de 1, 2 o 4 grupos de 8 bits, UTF-16 puede usar 1 o 2 grupos de 16, UTF-8 es compatible con ASCII, UTF-16 no lo es). Pueden ver una cadena con la secuencia de escape unicode: `'\u263A'`.
- boolean: a través de sus valores primitivos `true` y `false`.
- undefined: valor primitivo por defecto de las viariables, se usa la propiedad constante `undefined` del objeto global para acceder a él (ver la nota en los enlaces de abajo).
- null: es un valor primitivo, no depende de ningún objeto, que se usa para explicitar que el valor de la variable es intencionalmente nulo.

También existen:

- bigint: Número entero de precisión extendida (más de 64 bits), `123n`.
- symbol: Es un objeto de valor único e irrepetible. Se crea usando la función `Symbol` que puede recibir un string para poder identificarlo. Se usa como llave única en los diccionarios.

El tipo de un valor se puede consultar con la palabra reservada `typeof`.

```{note}
No es lo mismo un tipo primitivo que los tipos de objetos que representan las primtivas. Esta es otra dichosa funcionalidad de JavaScript. Ver [String primitives and String objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_primitives_and_string_objects), la diferencia está en que los objetos se representan de manera distinta a las primitivas.
```

```{note}
**El resultado NaN**: NaN quiere decir _Not a Number_, es posible obtener este valor como resultado de una operación entre números o número y cadenas, por ejemplo `7 * 'lalala'` retorna `NaN`, `undefined + undefined` también, `Math.sqrt(-1)` también... En otros lenguajes de programación surge de las operaciones de punto flotante pero, una vez más, JavaScript hace su propia interpretación. No es un tipo primitivo.
```

### Enlaces

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Overview

https://developer.mozilla.org/en-US/docs/Glossary/Primitive

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#literals

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide

Ejemplo: Hay dos páginas de referencia para `undefined`, cada una refiere a un contexto distinto, como valor primitivo y como propiedad del objeto global. Las propiedades del objeto global se pueden acceder directamente como valores (si espacio de nombres).

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined

https://developer.mozilla.org/en-US/docs/Glossary/Undefined


## Variables

El lenguaje es sensible a mayúsculas y minúsculas. Los nombres de variables pueden estar formadas por letras unicode, guión bajo, signo monetario y números pero no pueden comenzar con un número.

Ejemplos de nombres válidos:

```javascript
variable
Variable
$varible
_variable
varia_ble
```

Ejemplos de nombres inválidos:

```javascript
variable!
\variable123
varia ble
```

Las variables se pueden definir con las palabras reservadas `var` y `let`. No es lo mismo usar `var` o `let` y **vamos a usar siempre `let`**. Lo que cambia son las reglas de alcance de las variables según se use una u otra palabra reservada.

- Las variables declaradas con `var` tienen alcance de función. Se recomiendo no usar en archivos fuente.
- Las variables declaradas con `let` tienen alcance de bloque. Muy similar/igual a C++/Java/Processing.

Las constantes se definen con la palabra reservada `const`, en un giro semántico inesperado, las constantes son variables a las que no se le puede cambiar el valor. Por lo demás siguen las misma reglas de alcance que las variables declaradas con `let`.

Uso correcto:

```javascript
let variable = 123;
const MIL = 1000;

console.log(variable * MIL);

function f() {
    let w = 100;
    let h = 100;
    console.log(w + h);
}
```

Incorrecto aunque pueda funcionar:

```javascript
var variable = 123;
var MIL = 1000;

console.log(variable * MIL);

function f() {
    var h = 100;
    w = 100;
    console.log(w + h);
}
```

Las variables se pueden referenciar y asignar sin declarar o antes de su declaración por una técnica del complilador que se llama _hoisting_. Pero es algo que vamos a considerar un error por convención. Si utilizamos variables declaradas con `let` o `const` antes de ser usadas en un bloque el intérprete va a tiarar el error `ReferenceError` porque la variable no fue declarada y, por lo tanto, no puede ser referenciada.

El hoisting es el proceso por el cual el compilador asigna la memoria de las declaracions de variables, clases y funciones al inicio del bloque de alcance. Esto hace que los nombres de las funciones y las clases puedan ser utilizados antes de escribir su definición dentro de un archivo (puede ser práctico poner las definciones después o al final). Pero si lo usamos para variables la lógica y la lectura del código se pueden complicar bastante.

### Enlaces

https://developer.mozilla.org/en-US/docs/Glossary/Identifier

https://developer.mozilla.org/en-US/docs/Glossary/Scope

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types

https://developer.mozilla.org/en-US/docs/Glossary/Hoisting

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#variable_hoisting


## Comentarios

La sintáxis de los comentarios es la misma que C/C++ y Java. Existen los comentarios de línea y los comentarios multi línea.

Los comentarios de línea comienzan con `//` y llegan hasta el final de la línea (`\n` o `\r\n`).

Los comentarios multilínea comienzan con la secuencia de caracteres `/*` y terminan con la secuencia inversa `*/`. Los comentarios multilínea no pueden estar anidados, ver en el ejemplo.

```javascript
// Comentario de línea que comienza al principio de la línea.

let a;  // Comentario de línea que comienza al final de la línea.

/*
    Comentario multilínea.

    Es un comentario útil para escribir documentación o explicar un algoritmo.
    Todo el texto es prosa y lo formatean ustedes. En este caso está indentado
    por estilo con cuatro espacios. Es importante siempre respetar un estilo o
    convención dentro de un mismo proyecto.
*/

/*
 * Según estilos de programación pueden que vean que las líneas del medio
 * comienzan con asteriscos, eso es una cuestión estética. Pero también pueden
 * haber librerías que generen documentación automáticamente en base a los comentarios.
 * En ese caso, la sintáxis interna en el comentario la definen las herramientas.
 */

/* Comentarios multilínea en una sola línea. */

let /* comentario mal usado, confunde */ b = ':-(';
```

## Enlaces

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#comments



## Tipos y operadores

Mucha de la sintaxis de JavaScript se tomó prestada de C, C++ y Java por lo que les va a resultar más fácil pensar en el lenguaje. Muchos de los operadores son iguales entre estos lenguajes, sin embargo, su significado a veces depende de los tipos de objeto sobre los cuales se apliquen. Hoy vamos a ver solo algúnos de los más básicos. Les queda la referencia en el enlace del final para ver otros.

### Sobre números

Los operadores aritmétcos son los mismos que en C/C++ o Java, con la adición del operador de exponenciación `**`. No vamos a hacer mayores observacions pero hay que considerar que los números, por más que sean usados como enteros (`int` en java) **se representan internamente en punto flotante**.

```javascript
2 + 2;  // add
2 - 2;  // sub
2 * 2;  // mul
2 / 2;  // div
2 % 2;  // mod
2.5 % 2  // mod, los números son flotantes, devuelve 0.5.
2 ** 2;  // pow
```

Para otras operaciones como la raíz, logaritmo, etc., se usa el objeto incorporado `Math` que funciona con `Number` y no con `BigInt`.

### Sobre cadenas

Las cadenas se pueden escribir con comillas simples o dobles. El operador sobre cadenas que tiene símbolo lexicográficos es la concatenación que se representa con el operador `+`.

```javascript
"Hola" + " " + "mundo";
```

Por ejemplo, no se pueden restar o multiplicar cadenas, la expresiónd devuelve `NaN` en vez de tirar error (e.g. JavaScript).

No existe el tipo caracter, un caracter es un string de un solo caracter. Esto es muy común también en otros lenguajes interpretados.

Esiste un tipo de caden literal que se llama [plantilla de literales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), se escribe con `` ` `` (acento grave, tilde invertida) en vez de comillas y permiete escribir cadenas en múltiples líneas e interpolar expresiones cuyo valor se agrega a la cadena.

```javascript
typeof `string text`;  // string

// cadena multilínea
`string text line 1
 string text line 2`


// plantilla literal
`string text ${expression} string text`
```

Dentro de estas cadenas las expresiones se escriben dentro de la secuencia `${}`.

### Coerción de tipos

La [coerción de tipos](https://developer.mozilla.org/en-US/docs/Glossary/Type_Conversion), en otros lenguajes se llama casting o promoción, es la conversión automática de un valor de un tipo a otro según el operador que se use. Es muy común encontrar errores por coerción de tipos en algunas operaciones básicas entre [cadenas y números](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#numbers_and_the_operator).

Ejemplo:

```javascript
'9' + 5;  // Retorna el string '95', el valor numérico se convirtió en cadena y se concatenó.
5.1 + '9';  // Retorna el string '5.19', ídem.
"37" * 7;  // Retorna el número 259, el string se convirtió en el número que representa.

2 * '2';  // Retorna el número 4, el valor cadena se convirtió en numérico.
'2' - 2;  // Retorna -1, ídem.
'2.5' / 2;  // Retorna el número 1.25, ídem.
```

Cuando se hacen operaciones entre números y cadenas todos los operadores aritméticos hacen coerción a números salvo la adición. Con los operadores de comparación es al revés. Nada, esto es cosa JavaScript pero siempre hay que tener en cuenta de trabajar con los tipos adecuados.

Este comportamiento del lenguaje que permite la conversión implícita entre tipos distintos que actúan como operandos de una misma expresión se lo asocia con la noción de _tipado débil_ (weak typing). Este caso de conversión entre cadenas y números es paradigmático porque se consideran tipos no compatibles, en otros lenguajes existe la promoción automática entre tipos relacionados como son los números enteros y reales (int se convierte en float). Esto algo que se implementó por conveniencia en JavaScript pero puede generar más problemas conceptuales que beneficios prácticos y su uso no es recomendable (usar plantillas de cadenas en su lugar).

### Igualdades

Existen dos operadores de igualdad que se escriben `==` y `===`. El primero es el operador de [igualdad](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality) sin más. El segundo es el de [igualdad estricta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)  también llamado de identidad en otros lenguajes pero JavaScript siempre tiene sus propias reglas. Cada uno tiene su respectivo operador de desiguldad: `!==` y `!===`.

El operador de igualdad aplica _coerción de tipos_ y otras reglas que están especificadas en su elance. Por ejemplo:

```javascript
"1" == 1; // true
1 == "1"; // true
0 == false; // true
0 == null; // false
0 == undefined; // false
0 == !!null; // true, look at Logical NOT operator
0 == !!undefined; // true, look at Logical NOT operator
null == undefined; // true

const number1 = new Number(3);
const number2 = new Number(3);
number1 == 3; // true
number1 == number2; // false
```

El operador de igualdad estricta considera el tipo de los operandos y es más fácil de usar, tabién tiene sus reglas explicadas en el enlace:

```javascript
"3" === 3; // false
true === 1; // false
null === undefined; // false
3 === new Number(3); // false

"hello" === "hello"; // true
"hello" === "hola"; // false
3 === 3; // true
3 === 4; // false
true === true; // true
true === false; // false
null === null; // true
```

Los otros operadores de comparación (`<`, `>`, `<=`, `>=`) se bansan en el operador de igualdad y aplican coernción de tipos. Las reglas de conversión están explicadas está explicadas en la documentación de [less than](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than).

> Moraleja: Siempre hay que tener en cuenta qué posibles tipos de datos vamos a estar comparando en una expresión. Que los tipos de las variables sean dinámicos no quiere decir que se deban perder de vista los tipos.

### Valores interpretados como falso (falsy value)

Existe un conjunto de valores que son [considerados falsos](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) cuando como resultado de una expresión buleana. Por ejemplo:

```javascript
if(undefined) { /* Undefined es falso */ }
if(0) { /* Cero (positivo o negativo) es falso */ }
if('') { /* Una cadena vacía es falso */ }
if(null) { /* null es falso */ }
if(NaN) { /* NaN es falso */ }
```

Los operadores de lógica booleana (`&&`, `||`, `!`) los vemos luego.

### Enlaces

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table


## Funciones

Las funciones se usan para varias cosas distintas en JavaScript como funciones, métodos, objetos y constructores de objetos. En esta clase solo veremos las funciones como tales, en el sentido más común que se aplica en otros lenguajes de programación.

Hay varias maneras de definir funciones pero vamos a utilizar solo la más básica por ahora que consiste en usar la palabra reservada `function`.

```javascript
function nombreDeLaFuncion(argumento) {
    // Cuerpo de la función entre {}.
}
```

Las funciónes, utilizadas como tales, tienen que retornar un valor, para eso se usa la palabra reservada `return`. Funciona igual que en C/C++ y Java.

```javascript
function duplica(a) {
    return a * 2;
}

duplica(2);
```

Si hay más de un argumento estos se definen como una lista separada por comas.

```javascript
function multiplica(a, b) {
    return a * b;
}

multiplica(2, 3);
```

### Funciones como objetos

Las funciones en JavaScript son objetos y se pueden asignar a variables.

```javascript
function suma(a, b) {
    return a + b;
}

let mas = suma;
mas(2, 2);  // se llama a la función `suma` almacenada en la variable `mas`.
```

Como todo objeto, las funciones tienen propiedades. Por ejemplo, la propiedad `name` de un objeto función devuelve el nombre con el que fue declarada:

```javascript
mas.name;  // devuelve la cadena `'suma``.
```

Incluso las funciones se pueden definir sin nombre, algo que en otros lenguajes se conoce como _funciones anónimas_ o _funciones lambda_ y ser asignadas a variables o pasadas como argumento a otras funciones. La propiedad `name` de la función devuelve el nombre de la primera variable a la que se asignó la función.

```javascript
let otraSuma = function(a, b) { return a + b }
otraSuma(2, 2);
otraSuma.name;
```

Luego vamos a ver más sobre objetos.

### Función flecha

En JavaScript existe otro tipo de función llamada flecha. Las funciones flecha también equivalentes a las _funciones anónimas_ o _lambda_ en otros lenguajes porque se declaran sin nombre y se asignan a variables o se pasan como argumentos a otras funciones. El nombre de este tipo de función viene del símbolo que se utiliza para definirlas: `=>`.

```javascript
let sumaFlecha = (a, b) => { return a + b };

sumaFlecha(2, 2);
sumaFlecha.name; // devuelve el nombre de la variable a la cuál fue asignada inicialmente.
```

En el código de arriba, la función se define como lista de parámetros entre paréntesis, el cuerpo de la función entre llaves y el símbolo flecha uniendo ambambas partes: `parámetros => cuerpo`.

En relación a la POO, las funciones flecha no se comportan de la misma manera que las funciones comunes (declaradas con la palabra reservada `function`). Esto tiene que ver con las reglas de alcance de las variables y la palabra reservada `this`, porque en JavaScript las funciones comunes se usan para crear objetos que es algo que comentaremos más adelantes pero no vamos a usar.


## Referencia p5.js

Más allá de los detalles que vimos de JavaScript, en la referencia online de p5.js hay una sección que se llama [Foundation](https://p5js.org/reference/#group-Foundation) que lista los tipos de datos básicos que usa la librería y las estructuras de control que se usan habitualmente.
