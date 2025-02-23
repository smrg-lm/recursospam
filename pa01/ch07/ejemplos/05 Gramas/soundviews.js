
class SoundView {
    constructor(soundFile, x, y, width, height) {
        this.soundFile = soundFile;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fft = new p5.FFT();
    }

    draw() {
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

    clicked(x, y) {
        if (this.contains(x, y)) {
            this.toggle();
        }
    }

    contains(x, y) {
        return x >= this.x && x < this.x + this.width &&
            y >= this.x && y < this.y + this.height;
    }

    toggle() {
        if (this.soundFile.isPlaying()) {
            this.soundFile.pause();
        } else {
            this.soundFile.play();
        }
    }
}


class Oscilloscope extends SoundView {
    draw() {
        super.draw();
        stroke(0);
        const waveform = this.fft.waveform();
        for (let i = 0; i < waveform.length; i++) {
            let x = map(i, 0, waveform.length, this.x, this.x + this.width);
            let y = map(waveform[i], -1, 1, this.y, this.y + this.height);
            point(x, y);
        }
    }
}


class Spectroscope extends SoundView {
    draw() {
        super.draw();
        stroke(0);
        const spectrum = this.fft.analyze();
        for (let i = 0; i < spectrum.length; i++) {
            let x = map(i, 0, spectrum.length, this.x, this.x + this.width);
            let y = map(spectrum[i], 0, spectrum.length, this.y + this.height, this.y);
            line(x, this.y + this.height, x, y);
        }
    }
}
