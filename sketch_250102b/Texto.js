class Texto {
    constructor(texto, posX, posY, tamTexto, color) {
        this.texto = texto
        this.posX = posX
        this.posY = posY
        this.tamTexto = tamTexto
        this.color = color
    }

    dibujarTexto() {
        fill(this.color)
        textSize(this.tamTexto)
        text(this.texto, this.posX, this.posY)
    }
}
