/**
 * ix quiere decir initial x.
 * dx quiere decir destination x.
 * delta quiere decir la diferencia (distancia/tiempo) entre dos valores.
 */


class Easing {
    constructor(x = 50, y = 50, dx = 300, dy = 300, easing = 0.03) {
        this.x = this.ix = x;
        this.y = this.iy = y;
        this.dx = dx;
        this.dy = dy;
        this.d = 50;
        this.easing = easing;
    }

    move() {
        const delta = dist(this.x, this.y, this.dx, this.dy);
        if(delta >= 1.0) {
            this.x += (this.dx - this.x) * this.easing;
            this.y += (this.dy - this.y) * this.easing;
            // print('dib', delta, this.x);
        }
    }

    reset() {
        this.x = this.ix;
        this.y = this.iy;
    }

    draw() {
        this.move();
        fill(0, 200, 0);
        circle(this.x, this.y, this.d);
    }

    clicked() {
        if(dist(this.x, this.y, mouseX, mouseY) <= this.d / 2) {
            this.reset();
        }
    }
}
