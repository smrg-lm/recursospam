# Sistemas de partículas

Teoría y práctica en el aula:

1. Una partícula con gravedad y sin fricción.
2. Una clase, por composición, generadora del sistema de partículas.
3. Un generador de partículas con fricción en x e y.


## Partícula

```js
class Particle {
    // La gravedad (simplificada) es un valor constante para la partícula.
    gravity = 0.2;

    /**
     * Crea una partícula con forma circular. Las coordenadas x e y
     * refieren al centro y size es el diámtro del círculo.
     * La velocidad en cada coordenada, vx y vy, se usan para definir
     * el movimiento de la partícula (dirección y velocidad).
     * 
     * @param {number} x - Posición en x.
     * @param {number} y - Posición en y.
     * @param {number} vx - Velocidad en x.
     * @param {number} vy - Velocidad en y.
     * @param {number} size - Tamaño de la partícula circular.
     */
    constructor(x, y, vx, vy, size) {
        this.x = this.ix = x;
        this.y = this.iy = y;
        this.vx = this.ivx = vx;
        this.vy = this.ivy = vy;
        this.size = size;
        this.radius = this.size / 2;
    }

    update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.#checkBounds();
    }

    /**
     * En ivx, ivy se guardó la velocidad inicial para resetear
     * la partíciula cuando se va de la pantalla.
     */
    #checkBounds() {
        // Solo comprueba que salga por debajo del canvas.
        if(this.y > height + this.radius) {
            this.x = this.ix;
            this.y = this.iy;
            this.vx = this.ivx;
            this.vy = this.ivy;
        }
    }

    draw() {
        circle(this.x, this.y, this.size);
    }
}
```

## Partícula Aleatoria y Sistema de Partículas

```js
class RandomParticle extends Particle {
    /**
     * El constructor no es necesario en este caso.
     * Es solo para mostrar que los parámetros de la
     * superclase se deben iniciar con `super`.
     */
    constructor(x, y, vx, vy, size) {  // *** NOTE: se le podría agregar color.
        super(x, y, vx, vy, size);
    }

    /**
     * Este método sobreescribe el de la superclase
     * y cambia lo que hace. Ahora comprueba si sale del
     * camvas también por los costados.
     */
    checkBounds() {
        if(this.y > height + this.radius || this.x > width + this.radius || this.x < 0 - this.radius) {
            this.x = this.ix;
            this.y = this.iy;
            this.vx = random(this.ivx, 0);
            this.vy = random(this.ivy, 0);
        }
    }
}


class Fuente {
    /**
     * Esta clase es un generador de partículas aleatorias.
     * En vez de heredar de otra clase se dice que está
     * *compuesta* de otras clases, en este caso es un conjunto
     * de RandomParticle.
     */

    constructor(x, y, num) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.#init(num);
    }

    #init(num) {
        for(let i = 0; i < num; i++) {
            let vx = random(-2.0, 2.0);
            let vy = random(-10.0, 0);
            let p = new RandomParticle(this.x, this.y, vx, vy, 10);
            this.particles.push(p);
        }
    }

    update() {
        for(const p of this.particles) {
            p.update();
        }
    }

    draw() {
        for(const p of this.particles) {
            p.draw();
        }
    }
}
```

## Partícula que Rebota.

```js

class BouncingParticle extends Particle {
    // Esta subclase define una nueva propiedad del movimiento.
    friction = 0.99;

    /**
     * Este método sobreescribe el de la superclase,
     * modifica la velocidad y llama al método de la
     * superclase para que aplique el movimiento y
     * compruebe los límites.
     */
    update() {
        // Aplica la fricción que reduce la velocidad.
        this.vx *= this.friction;
        this.vy *= this.friction;
        // Llama al método update de la superclase,
        // `super` se usa de la misma manera que `this`.
        super.update();
    }

    /**
     * En esta subclase comprueba si choca con los bordes
     * del canvas para x e y para que pueda rebotar (cambiar
     * de dirección).
     */ 
    checkBounds() {
        if(this.x > width - this.radius || this.x < this.radius) {
            // Cambia la dirección en x si choca con los bordes.
            this.vx = -this.vx;
            // Evita que la partícula se siga desplazando fuera del canvas.
            this.x = constrain(this.x, 0, width - this.radius);
        }
        if(this.y > height - this.radius || this.y < this.radius) {
            // Cambia la dirección en y si choca con los bordes.
            this.vy = -this.vy;
            // Evita que la partícula se siga desplazando fuera del canvas.
            this.y = constrain(this.y, 0, height - this.radius);
        }
    }
}


class Fuente {
    /**
     * Esta clase es un generador de partículas aleatorias.
     * En vez de heredar de otra clase se dice que está
     * *compuesta* de otras clases, en este caso es un conjunto
     * de BouncingParticle.
     */

    constructor(x, y, num) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.#init(num);
    }

    #init(num) {
        for(let i = 0; i < num; i++) {
            let vx = random(-20.0, 2.0);
            let vy = random(-10.0, 0);
            let p = new BouncingParticle(this.x, this.y, vx, vy, 10);
            this.particles.push(p);
        }
    }

    update() {
        for(const p of this.particles) {
            p.update();
        }
    }

    draw() {
        for(const p of this.particles) {
            p.draw();
        }
    }
}
```
