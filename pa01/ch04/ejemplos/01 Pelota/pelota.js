
class Pelota {
    #dirX;
    #dirY;
    #speedX;
    #speedY;

    /**
     * Pelota que se mueve dentro del canvas a distintas
     * velocidades y rebotando contra los bordes.
     * @param {number} x - Centro de la pelota en x.
     * @param {number} y - Centro de la pelota en y.
     * @param {number} r - Radio de la pelota.
     * @param {color} color - Objeto color de p5.js.
     */
    constructor(x = 0, y = 0, r = 50, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.#dirX = random([-1, 1]);
        this.#dirY = random([-1, 1]);
        this.#speedX = random(0, 10);
        this.#speedY = random(0, 10);
    }

    /**
     * Mueve la pelota dentro de los límites del lienzo.
     * Este método se llama desde `draw`.
     */
    move() {
        this.#checkBounds();
        this.x += this.#speedX * this.#dirX;
        this.y += this.#speedY * this.#dirY;
    }

    /**
     * Comprueba los bordes/límites y cambia la direccion
     * del movimiento.
     */
    #checkBounds() {
        // Comprueba los bordes en el eje horizontal.
        if(this.x - this.r <= 0 || this.x + this.r >= width) {
            this.#dirX *= -1;
        }

        // Comprueba los bordes en el eje vertical.
        if(this.y - this.r <= 0 || this.y + this.r >= height) {
            this.#dirY *= -1;
        }
    }

    /**
     * Dibuja la pelota. Este método se llama desde `draw`.
     */
    draw() {
        noStroke();
        fill(this.color);
        circle(this.x, this.y, this.r * 2);
    }
}
