/*
  Implementación del buffer de texto. Está hecho de la maner más simple
  agregando borrado y cursor. La funcionalidad completa no es algo que
  se pueda implementar en pocas líneas. Tal vez haya algúna librería
  externa.
*/


class TextBuffer {
    constructor() {
        this._buffer = [];
        this._pos = 0;
    }

    text() {
        return this._buffer.join('');
    }

    write(value) {
        console.log(this._pos, this._buffer.length);
        this._buffer.splice(this._pos, 0, value);
        this.moveRight();
    }

    backspace() {
        if (this._pos > 0) {
            this._buffer.splice(this._pos - 1, 1);
            this.moveLeft();
        }
    }

    delete() {
        if (this._pos < this._buffer.length) {
            this._buffer.splice(this._pos, 1);
        }
    }

    moveRight() {
        if (this._pos < this._buffer.length) {
            this._pos++
        }
    }

    moveLeft() {
        if (this._pos > 0) {
            this._pos--;
        }
    }
}
