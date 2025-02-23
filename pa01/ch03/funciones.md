# Funciones

```{note}
Descarga la [Carpeta de Ejemplos](./ejemplos.zip)
```

## Procedimientos, funciones, métodos...

Los procedimiento (subrutinas, subprograma, funciones, métodos) son una forma de modularizar la complejidad de los programas agrupando instrucciones relacionadas para solucionar una parte de un problema informático más amplio. Usados en conjunto con las estructuras de datos y las variables globales en Processing nos permiten abstraer partes de un programa en unidades más pequeñas que se especializan en realizar una acción concreta y bien definida.

El término procedimiento refiere al principio general de modularizar código agrupando instrucciones simples para componer instrucciones más complejas. Sin embargo, los lenguajes de programación no suelen usar este concepto de manera tan simplificada, salvo algunos lenguajes con finalidad didáctica. En base a la teoría de la programación estructurada y la programación orientada a objetos, a los procedimientos se los suele llamar funciones o métodos respectivamente.

Las **funciones** son un recurso de **agrupamiento de instrucciones** que **procesan información** y **devuelven un resultado**. Pueden recibir parámetros y pueden retornar un valor como resultado del procesamiento interno, esto es opcional.

A veces las funciones se usan para modificar el estado del programa, por ejemplo el _canvas_ en  Processing, o para procesar un valor de retorno sin modificar ni acceder al estado de otras partes del programa. Cambiar el estado de otras partes del programa se llama **efecto colateral** o secundario. Según la técnica de programación que se use esto puede ser bueno o malo.

## Efectos colaterales

Vamos primero con los efectos colaterales porque es algo que pude generar problemas. Si en p5.js escribimos una función que dibuja en el _canvas_ HTML 5 estamos creando una subrutina de dibujo que altera el estado de la _máquina de estados_ que se encarga de dibujar, puesto que para crea nuevas formas sobre el lienzo se suele cambiar el color de relleno, el color del borde, el modo de centrado, etc.

```javascript
function draw() {
  dibujo(0, 0, 100, 100);
}

function dibujo(x, y, w, h) {
  fill('magenta');
  stroke('blue');
  strokeWeight(2);
  rect(x, y, w, h);
}
```

La función `dibujo` contiene instrucciones para dibujar una forma específica a partir de formas simples (primitivas de processing) pero, lo importante, es que esta función además **cambia el estado** del color, relleno y el ancho del pincel. Si desde la función `draw`, luego de llamar a esta función dibujamos un rectángulo, el color, relleno y ancho del pincel va a ser el que dejó puesto la función dibujo.

```javascript
function draw() {
  dibujo(0, 0, 100, 100);
  // Al volver, el color, relleno y ancho son los que se definieron dentro de la función dibujo.
  rect(width / 2 - 50, height / 2 - 50, 100, 100);
}
```

> **Si se usan funciones para agrupar instrucciones de dibujo que cambian `fill`, `stroke`, `rectMode`, `ellipseMode` etc. siempre hay que considerar que a la vuelta el estado de la máquina de dibujo puede haber cambiado. El estado de estas primitivas siempre hay que definirlo antes de dibujar algo.**

En la programación orientada a objetos, los **métodos** suelen funcionar de manera similar. Son funciones propias de los objetos que modifican el estado de sus datos internos de manera especializada y segura. Esto lo veremos luego cuando veamos **clases**, pero los principios serán los mismos.

## Agrupamiento de instrucciones

La función `dibujo` es un subprograma que agrupa instrucciones de dibujo haciendo que sean reutilizables. Se podría llamar varias veces para crear figuras compuestas para las cuales la función `dibujo` es solo una parte del todo. El ejemplo más simple sería generar una fila de dibujos creando otra función que llame a la función `dibujo`.

```js
/*
    Subprograma que modifica el estado del lienzo.
    Dibuja una línea de `num` rectángulos en la posición
    <x, y> dentro del tamaño definido por width y height.
    El color de fill y stroke y el ancho de stroke son
    cambiados por la función `dibujo` que se llama desde
    esta función.
*/
function filaDeDibujos(num, x, y, w, h) {
  let ancho = w / num;
  for(let i = 0; i < num; i++) {
      dibujo(x + (ancho * i), y, ancho, h);
  }
}
```

De esta manera se abstrajo la forma _fila de rectángulos_ para convertirla en una forma compleja. En programas más complejos, la función `fileDeDibujos` se podría reutilizar como componente o utilizar como parte de un todo más amplio. Por ejemplo, no voy a revelar nada inspirador, llenar el lienzo con una matríz de cuadrados.

```js
function matrizDeDibujos(num, x, y, w, h) {
  let alto = h / num;
  for(let i = 0; i < num; i++) {
    // Se llama a la función con los argumentos correspondientes.
    filaDeDibujos(num, 0, alto * i, w, alto);
  }
}
```

Lo que hiciemos con todos estos pasos es **modularizar** el problema, por un lado tenemos la función `dibujo` que se encarga de hacer el mejor dibujo posible, luego la función `filaDeDibujos` que se encarga de hacer una fila y la función `matrizDeDibujos` que utiliza las filas para crear una matriz que cubra todo el lienzo.

## Procesamiento de información

El siguiente es un ejemplo de una función que no cambia el estado de ninguna otra parte del programa que la usa. Los datos numéricos son pasados como argumentos y el valor resultante del procesamiento es devuelto como valor de retorno de la función:

```javascript
// Subprograma sin efecto colateral.
function suma(a, b) {
    return a + b;
}

// Uso del subprograma desde el programa principal.
let resultado = sum(10, 10);
```

De nuevo, es un ejemplo trivial, pero hay programas que pueden requerir cálculos muy complejos o necesitar de funciones simples que sean reutilizables.


## Funciones en JavaScript

Las funciones se pueden definir con o sin **parámetros**, con o sin valor de retorno. Para que la función reciba valores externos hay que definir parámetros. Estos son mobres de variables enlistados entre los parentesis de la función como vimos arriba. Los parámetros pueden tener valores asignados por defecto de la siguiente manera:

```javascript
// Subprograma sin efecto colateral.
function suma(a = 2, b = 2) {
    return a + b;
}
```

Definida de esta manera, la función se puede llamar sin argumentos como `let x = suma()`. Si la función no define valores por defecto para sus parámetros estos se les deben pasar cuando la función es llamada/invocada. Los valores que se le pasan a los parámetros cuando se llama a la función se denominan **argumentos**.

Si no se definen valores por defecto y no se le pasan argumentos a las funciones, el valor de los parámetros va a ser `undefined` ¡y no nos va a tirar ningún error al llamar a la función! Hay que tener mucho cuidado con esto, el error seguramente se manifieste en otro lugar cuando se encuentre con el valor indefinido en una expresión o no dibuje nada en el lienzo.

Por ejemplo, si la función suma no define valores por defecto y se llama sin argumentos no tira error y devuelve `NaN` o.O Hay que tener cuidado con esto.

```javascript
function suma(a, b) {
    return a + b;
}

let x = suma();
console.log(x);  // NaN (undefined + undefined)
```

### Argumentos variables (rest parameter)

Dentro de la lista de parámetros, como único o último parámetro se puede escribir una elipsis y un identificador para capturar cantidades variables de argumentos que se pasen al invocar la función. De manera simétrica, si los argumentos de una función provienen de una colección iterable se puede escribir como argumento la elipsis y el nombre de la variable que contiene los valores. Funciona con listas y conjuntos o cualquier tipo de dato que sea iterable.

```javascript
// La elipsis captura todos los argumentos que se pasen una vez asignados los primeros tres.
function varios(a, b, c, ...resto) {
    console.log(a, b, c, resto);
}

// Un array con valores demás.
let arr = [1, 2, 3, 4, 5, 6];

// La elipsis despliega el array y reparte los valores como argumentos.
varios(...arr);
```

Las mismas reglas valen para las funciones flecha.


## Funciones en Processing

Desde el comienzo venimos utilizando funciones en p5.js, `preload`, `setup` y `draw` son funciones que se especializan en distintas partes del _sketch_ como programa. Una carga los recursos de antemano, la otra se encarga de la configuración general y la última de aplicar las primitivas de dibujo en bucle sobre el lienzo.

A partir de ahora vamos a utlizar otras funciones de p5.js que se encargan de los métodos de entrada o periféricos de la computadora: ratón y teclado. También se pueden definir elementos HTML que actúen como método gráfico de entrada de valores por parte del/la usuario/a.

### Teclado

Ver ejemplos.

### Ratón

Ver ejemplos.

### Elementos HTML

Ver ejemplos.

Para interactuar con los elementos HTML hay que definir **funciones de respuesta** (_callback_ en inglés). Como en JavaScript las funciones son objetos en sí mismas, estas se pueden pasar como valores a otras funciones que se encargan de llamarlas cuando sea necesario. La librería p5.js internamente utiliza las funciones predefinidas como _callbacks_ que responden a los valores de entrada de los _eventos_ que se generan al interactuar con el _hardware_. La única diferencia es que para este caso las funciones las tenemos que definir y pasar como argumento a los elementos HTML creados.

Por ejemplo, para crear un _slider_ HTML y obtener el valor que genera cada vez que se interactúe con él se debe pasar una función de respuesta al método `input`:

```javascript
let slider = createSlider(1, 10, 0, 1);  // Crea el objeto slider.
let valorSlider = 0;  // Variable global para guardar el valor del slider.

// Función de respuesta que se llama cada vez que se mueva el slider.
function respuesta() {
    valorSlider = slider.value();
}

slider.input(respuesta);  // Asigna nuestra función como callback.
console.log(valorSlider);  // Utiliza el valor en el programa.
```

## Enlaces

https://es.wikipedia.org/wiki/Subrutina

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
