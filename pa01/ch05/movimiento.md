# Movimientos simples

La idea de los programas que vamos a ver es ir aprendiendo algunas técnicas para controlar el movimiento de objetos que queramos mover por el linezo.

De esta manera mediante los diferentes programas veremos: delimitar el movimiento de un objeto, generar un rebote, crear una especie de estela del movimiento de un objeto, cambiar la dirección del movimiento de los objetos, generar movimientos mediante curvas, aplicar transformaciones.

Los ejemplos que vamos a ver se basan en principios muy simples y se pueden combinar entre sí puesto que son funciones matemáticas.

## Ejemplo Pelota (visto en la clase anterior)

Control de movimiento y detección de bordes.

- El objeto se mueve y rebota con los bordes.
- Círculo, posición en `x`, y `radio`.
- Velocidad (speed) en `x` como incremento de posición (método move).
- Dirección en `x`, factor `1` o `-1`, condición de cambio.
- Velocidad distinta en `x` e `y` como movimiento 2D.
- Velocidad como factor/incremento proporcional.

## Ejemplo Easing

- La velocidad cambia según el porcentaje del recorrido.
- `x, y` es la posición actual del centro del objeto (el dibujo).
- `ix, iy` es la posición inicial del objeto.
- `dx, dy` es la posición final del objeto.
- `easing` es un porcentaje de incremento que depende del tramo recorrido.
- A la posición se el suma un incremento: `x += (dx - x) * easing`.
- El recorrido termina cuando la distancia entre `dx` y `x` es casi cero (menor que 1).

## Aleatorio

Movimiento orgánico.

- El objeto se mueve aleatoriamente en distintas direcciones.
- `posx, posy` son la posición del centro del objeto.
- Opción 1: `dx, dy` son el desplazamiento aleatoria desde la posición del objeto (vibración).
- Opción 2: `incx, incy` es la distancia que se puede mover `posx, posy` de manera aleatoria (movimiento browniano), puede ser entre valores discretos `random([-incx, 0, incy])`.

## Circular

Movimiento mecánico en base a funciones periódicas.

- El movimiento del objeto es circular.
- Las posiciones en `x` e `y` cambian según las funciones `sin` y `cos` en relación a la posición central.
- Las funciones `sin` y `cos` se incrementan con un contador con valores pequeños (`0.01`).
- `amp` es la amplitud que en este caso es la distancia entre el centro del movimiento y la posición en `x` e `y`.
- `freq` es la frecuencia del movimiento (qué tan rápido gira), multiplica el incremento de las funciones `sin` y `cos`.

## Robot

Movimiento interactivo controlando la dirección mediante rotación y traslación.

- El objeto se mueve según los eventos de entrada.
- Los eventos de entrada se procesan en `draw` porque le movimiento es continuo mientras las teclas estén presionadas. Se puede presionar más de una tecla a la vez. Se usa la función primitiva `keyIsPressed`.

Opción 1:
- El movimiento en `x` e `y` se da en coordenadas absolutas.
- El movimiento es arriba, abajo, izquierda derecha.
- La velocidad sobre los ejes es un valor que se agrega a la posición `x` o `y` según la flecha que se presione.

Opción 2:
- El movimiento en `x` e `y` es relativo a la posición y dirección en la que apunta el objeto.
- El movimiento es adelnate o atrás en la dirección que apunta la parte frontal.
- La "velocidad" en `x` e `y` va a depender del ángulo en que apunte el robot, para eso se usan las funciones `sin` y `cos` como en el ejemplo anterior, es el mismo principio. Las funciones nos dan el incremento proporicional, positivo o negativo, según la dirección.
