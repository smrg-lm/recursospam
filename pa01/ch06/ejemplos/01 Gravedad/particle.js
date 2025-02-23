
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
