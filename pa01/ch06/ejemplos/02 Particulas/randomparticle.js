
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
