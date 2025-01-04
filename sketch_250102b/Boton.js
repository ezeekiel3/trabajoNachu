class Boton {
    constructor(texto, imgPosX, imgPosY, imgAncho, imgAlto, tamTexto) {
        this.texto = texto
        this.imgAncho = imgAncho
        this.imgAlto = imgAlto
        this.imgPosX = imgPosX
        this.imgPosY = imgPosY
        this.tamTexto = tamTexto
        this.textoPosX = imgPosX
        this.textoPosY = imgPosY
    }

    dibujarBoton(img) {
        image(img, this.imgPosX, this.imgPosY, this.imgAncho, this.imgAlto)
        textSize(this.tamTexto)
        text(this.texto, this.textoPosX, this.textoPosY) // texto posicion
    }
}
