class Jugador {
    constructor(x, y, ancho, alto, velocidad) {
        this.x = x
        this.y = y
        this.ancho = ancho
        this.alto = alto
        this.velocidad = velocidad
        this.pasos = 0
    }

    mover() {
        if (keyIsDown(LEFT_ARROW) && this.pasos > -20) {
            this.pasos--
        }
        if (keyIsDown(RIGHT_ARROW) && this.pasos < 95) {
            this.pasos++
        }
        this.x = this.pasos * this.velocidad
    }

    dibujar(img) {
        image(img, this.x, this.y, this.ancho, this.alto)
    }
}
