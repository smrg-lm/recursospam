
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
