
class Robot {
    constructor(x, y, angle=0, size=50) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 2;
        this.size = size;
        this.rad = size / 2;
    }

    draw() {
        fill(255);
        stroke(0);
        circle(this.x, this.y, this.size);
        fill(0);
        circle(
            this.x + cos(this.angle) * this.rad * 0.6,
            this.y + sin(this.angle) * this.rad * 0.6,
            this.size * 0.25
        );
    }

    move() {
        if(keyIsDown(SHIFT)) {
            this.speed = 4;
        } else {
            this.speed = 2;
        }

        if(keyIsDown(RIGHT_ARROW)) {
            this.angle += 0.1;
        } else if(keyIsDown(LEFT_ARROW)) {
            this.angle -= 0.1;
        }

        const incx = this.speed * cos(this.angle);
        const incy = this.speed * sin(this.angle);

        if(keyIsDown(UP_ARROW)) {
            this.x += incx;
            this.y += incy;
        } else if(keyIsDown(DOWN_ARROW)) {
            this.x -= incx;
            this.y -= incy;
        }
    }
}
