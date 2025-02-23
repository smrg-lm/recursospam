# Programación orientada a objetos en JavaScript

```{note}
Descarga la [Carpeta de Ejemplos](./ejemplos.zip)
```


## Prototipos

En realidad, JavaScript no es un lenguaje orientado a objetos sino basado en prototipos, lo cuál es un paradigma/modelo ligeramente diferente. En la programación basada en prototipos no hay clases. Todos los objetos se crean a partir de otros objetos que, en última instancia, se crean a partir de un objeto raíz predefinido en el lenguaje, esto es el objeto `Object`.

Como vimos con los objetos literales, los objetos son estructuras de datos similar a los diccionarios, una collección dinámica de pares llave-valor donde la llave es el nombre de una propiedad o atributo del objeto y el valor es la propiedad en sí. Cuando a una llave le asignamos una función podemos crear métodos si usamos la palabra reservada `this` que es una pseudo variable que refiere a un objeto determinado según el contexto pero, básicamente, dentro de un objeto refiere al mismo objeto.

Si, además, a los objetos les agregamos una propiedad que refiere a otro objeto que fue usado como prototipo del objeto actual y del cual copia sus datos y fucniones tenemos los ingredientes básicos de la programación basada en prototipos. Lo único que falta es un mecanismo para crear dinámicamente la copia de los datos de los objetos prototipo a los objetos nuevos y esto se logra con el operador `new` que copia la estructura de datos en otro espacio de memoria y llama a una función, constructura, para inicializar las propiedades con los parámetros que le pasemos al nuevo objeto que estamos creando.

Pero sí, en la práctica esto es algo más instrincado que su mera escencia. No vamos a ver todos los detalles, pormenores y variantes históricas que hay y se mantienen por cuestiones de compatibilidad. Vamos a usar las características que agrega la versión seis del estándar que facilitan la programación orientada a objetos en relación a los paradigmas más difundidos por otros lenguajes (C++/Java). Vamos a usar clases como plantillas que especifican cómo crear objetos con propiedades y métodos.


## Clases

En base al sistema de prototipos, el estándar _ES6_ agrega la sintáxis necesaria para definir clases. La sintáxis de clases simplifica muchos conceptos de la programación orientada a objetos y permite que el código sea más claro y conciso agregando sus propias reglas sintácticas.

La definición de una clase consiste en la palabra reservada `class`, seguida del nombre de la clase y los corchetes que definen el cuerpo de la clase donde se define su contenido.

```javascript
class MiClase {
    // Cuerpo de la clase.
}
```

Para poder crear una clase con el operador `new` es necesario definir un método llamado _constructor_ (el identificador del método debe llamarse de esa manera) que es quien se encarga de inicializar la instancia de la clase con sus valores por defecto o los argumentos que se le pasen para su creación si el constructor define parámetros.

```javascript
class Punto {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
```

```{note}
Las clases siempre deben ser declaradas antes de su uso dentro de un bloque de código, es decir, no se hace _hoisting_ como con las funciones comunes.
```

Luego, para crear un objeto de la clase definida se usa el operador `new` de la siguiente manera:

```javascript
let instancia1 = new Punto;  // Usa los parámetros por defecto.
let instancia2 = new Punto(100, 100);  // Crea un punto en la posición <100, 100>.

console.log(instancia1);  // Punto { x: 0, y: 0 }
console.log(instancia2);  // Punto { x: 100, y: 100 }
```

El operador `new` busca el método llamado _constructor_ de la clase y lo evalúa al crear los objetos de instancia. Si la clase no tuviera un método llamado _constructor_ se llama al constructor por defecto que está definidos en la superclase. La superclase por defecto es `Object` y su constructor no hace nada. Si el constructor no recibe parámetros se pueden omitir los paréntesis al crear un objeto con `new`.

La sintáxis empleada para crear objetos a partir de clases se encarga de organizar el sistema de prototipos. Al crear un objeto `Punto` el prototipo del objeto creado es la clase que lo define.

También es importante saber que el constructor retorna un valor y ese valor es el que devuelve la expresión `new Punto` cuando se crea el objeto que luego se asigna a una variable. Por defecto, el constructor retorna `this` que es la instancia que está siendo creada como veremos a continuación. Hay que tener cuidado con esto porque si se usa la expresión `return` y se retorna otro tipo de objeto que no sea primitivo o `this` la lógica de prototipos del objeto creado puede no ser la esperada. [**REVISAR REDACCIÓN**]


### Propiedades (atributos de una clase)

Dentro de la función _constructor_ del ejemplo anterior, y las desmás funciones que se definan dentro del cuerpo de una clase, se debe usar la palabra reservada `this` que, en estos casos, refiere a la instancia del objeto creado a partir de la clase. Por eso, al escribir `this.x = x` se le está creando un campo (propiedad/atributo) `x` al nuevo objeto descrito arriba.

Las propiedades también se pueden definir de manera similar a como se hace con las propiedades en la notación de objetos literales. Dentro del cuerpo de una clase, en vez de usar los dos puntos y la coma para crear propiedades se pueden crear expresiones que asignen valores a identificadores (nombres de variables) y estos se convierten en propiedades.

El siguiente ejemplo crea una clase sin constructor que contiene las propiedades `x` e `y` que se inicializan a los valores asignados cuando se crea el objeto:

```javascript
class Punto {
    x = 0;
    y = 0;
}

let instancia = new Punto;
console.log(instancia);  // Punto { x: 0, y: 0 }
```

### Métodos (funciones/procedimientos de una clase)

De la misma manera que pasa con las variables que se convierten en propiedades, en vez de crear explícitamente pares llave-valor, como hacemos con los objetos literales, al crear una función dentro del cuperpo de una clase esta pasa a ser un método con el nombre que define la función.

```javascript
class Punto {
    x = 0;
    y = 0;

    métodoConReturn() {
        return this.x * 10;
    }

    métodoSinReturn() {
        this.y = this.x * 10;
    }
}

let instancia = new Punto;
console.log(instancia);  // Punto { x: 0, y: 0 } Los métodos no se listan como propiedades al imprimir.

instancia.x = 10;  // Se le asigna el valor 10 a la propiedad x.
let res = instancia.métodoConReturn();  // Llamada al método que multiplica la propiedad x por 10;
console.log(res);  // 100
```

Si un método no usa la expresión `return` para devolver un valor en particular, por defecto, al llamar a un método se retorna el valor `undefined`.

```javascript
res = instancia.métodoSinReturn();
console.log(res);  // undefined
console.log(instancia.y);  // 100;
```

Para hacer que los métodos sean _concatenables_ estos deben retornar explícitamente `this`. Esto es algo que se ve en la documentación de muchas librerías y posibilita una técnica que se denomina _llamadas en cascada_ que posibilita llamar sucesivamente distintos métodos sobre un mismo objeto. Por ejemplo:

```javascript
obj.método1().método2().método3();
```

En vez de escribir todo por separado:

```javascript
obj.método1();
obj.método2();
obj.método3();
```

Siempre hay que leer la documentación para saber qué hace un método y cómo debe ser usado.


## Elementos de las clases

De los elementos que se pueden definir en una clase hasta ahora vimos solo dos, las propiedades y los métodos. Estos son los que más vamos a usar, pero también existen modificadores que cambian el comportamiento de las propiedades y los métodos que se enumeran brevemente a continuación.

### Visibilidad (público o privado)

Para propiciar el principio de encapsulación de los datos y las acciones, la notación de clases posibilita la definición de propiedades y métodos privados. Por defecto, todos las propiedades y métodos son públicos, es decir, se pueden acceder desde fuera de los objetos. Para hacer que las propiedades y los métodos sean privados se utiliza el caracter `#` como prefijo de los identificadores.

```javascript
class Punto {
    // Propiedades privadas.
    #x = 0;
    #y = 0;
    #res;  // undefined

    constructor(x, y) {
        // Inicialización de propiedades privadas.
        this.#x = x;
        this.#y = y;
    }

    #cálculoInterno() {
        // Método privado que calcula cosas.
        this.#res = this.#x + this.#y;
    }

    resultado() {
        // Método público que exterioriza el resultado.
        this.#cálculoInterno();
        return this.#res;
    }
}

let a = new Punto(10, 10);
console.log(a.resultado());
```

Si se intenta acceder a las propiedades o métodos privados desde fuera de la clase se produce un error de sintáxis:

```javascript
console.log(a.#res); // SyntaxError: Private field '#res' must be declared in an enclosing class
console.log(a.#cálculoInterno());  // SyntaxError: Private field '#cálculoInterno' must be declared in an enclosing class
```

Las propiedades y métodos privados son siempre _friend_, pueden ser accedidos desde métodos de otros objetos siempre que sean instancias de la misma clase.


### Métodos de acceso (get, set)

Siguiendo las prácticas de la POO, las propiedades de los objetos se pueden definir como privados y alentar a que el acceso y el cambio de estado que se hace sobre esos valores sea mediante métodos que garanticen la consistencia al estado interno del objeto.

```javascript
class Punto {
    #x = 0;
    #y = 0;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    set x(value) {
        console.log('llama a set x');
        this.#x = value;
    }

    get x() {
        console.log('llama a get x');
        return this.#x;
    }

    set y(value) {
        console.log('llama a set y');
        this.#y = value;
    }

    get y() {
        console.log('llama a get y');
        return this.#y;
    }
}

let a = new Punto();
a.x = 100;  // Llama a set x.
a.y = 200;  // Llama a set y.
console.log(a.x, a.y);  // 100 200. Llama a get x y get y.
```

### Locación (clase o instancia)

Las propiedades y los métodos también pueden pertenecer a las instancias o a las clases. Esto es una regla de alcance muy común en la POO. Por defecto todas las propiedades y métodos son de instancia.

Los elementos que pertenecen a las clases se almacenan en la clase como como objeto en sí mismo. Para definir propiedades y métodos de clase se usa el modificador `static`.

```javascript
class Estático {
    static campo = 'Campo de la clase.';

    static método() {
        console.log('Método de la clase.');
    }
}

let a = new Estático();

console.log(a.campo);  // undefinded, campo no está definido para la instancia.
console.log(Estático.campo);  // Campo de la clase

a.campo = 'Propiedad de la instancia';  // Se define campo como propiedad de la instancia (no hacer por error).
console.log(a.campo);  // Propiedad de la instancia.

console.log(Estático.campo);  // Campo de la clase siempre existe en la clase.

Estático.método();  // Método de clase.
a.método();  // Error, método no es una función (no está definido para la instancia).
```

Los modificadores `get` y `set` se pueden complementar con `static` para crear métodos de acceso a propiedades de la clase.


## Herencia

La herencia se define con la palabra reservada `extends` de la siguiente manera:

```javascript
class SuperClase { /* Cuerpo */ }
class SubClase extends SuperClase { /* Cuerpo */ }
```

Para acceder a los atributos y el constructor de la superclase se utiliza la palabra reservada `super`.

```javascript
class SuperClase {
    constructor(value) {
        this.superval = value;
    }
}

class SubClase extends SuperClase {
    constructor(value1, value2) {
        super(value1);  // Inicializa superval.
        this.subval = value2;
    }
}

let a = new SubClase(1, 2);
console.log(a.superval, a.subval);  // 1 2
```

Al sobreescribir el constructor en una subclase siempre es necesario llamar a `super()` para inicializar las propiedades heredadas de la superclase antes de usar la palabra reservada `this`. Esto es así aunque el constructor de la superclase no esté definido o no reciba argumentos.

Las propiedades y métodos heredados se pueden sobreescribir en una subclase y se puede acceder a la implementación de la superclase usando `super` de la misma manera que `this`. Pero los que sean privados no se pueden acceder desde las subclases (mantiene el principio de encapsulamiento).

```javascript
class SuperClase {
    #x = 123;  // Las propiedades privadas no se pueden acceder desde las subclases.

    constructor(value) {
        this.superval = value;
    }

    modifica() {
        console.log('llama a super');
    }
}

class SubClase extends SuperClase {
    constructor(value1, value2) {
        super(value1);  // Inicializa superval.
        this.subval = value2;
    }

    modifica() {
        console.log('llama a sub');
        super.modifica();  // Llama al método homónimo de la superclase.
        // super.#x = 321;  // Error, no se pueden acceder los atributos privados de la superclase.
    }
}

let a = new SubClase(1, 2);
console.log(a.modifica());
```


## Enlaces

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects#defining_getters_and_setters

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks


### Estilo previo a ES6

Existe en código heredado, **no lo vamos a ver, es más complicado**. Para crear objetos se usaban funciones como constructores de objetos donde se definían los valores de las variables de instancia y objetos literales que se utilizaban como el prototipo para agregar métodos. La construcción de los objetos se hacía mediante métodos estáticos de `Object`, `create`, `assign` que definían la lógica de esta funcionalidad. Las propiedades `__proto__` (instancia) y `prototype` (en los prototipos(create)/constructores(assign), para la cadena de prototipos hasta `null`) son convenciones, para acceder al prototipo hay que usar el método estátido `Object.getPrototypeOf(obj)`.

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
