class Piedra {
    constructor(piedraX, piedraY, piedraAncho, piedraAlto) {
        // si se modifica el alto y ancho de la piedra hay arreglar la posicion del rect y unirlo con la piedra
        this.piedraX = piedraX
        this.piedraY = piedraY
        this.piedraAncho = piedraAncho
        this.piedraAlto = piedraAlto
        this.rectX = piedraX
        this.rectY = piedraY
        this.rectAncho = piedraAncho
        this.rectAlto = piedraAlto
    }

    dibujarPiedra(img) {
        fill(160, 160, 160, 0)
        //rect(this.rectX - 7, this.rectY + 65, this.rectAncho / 3 + 10, this.rectAlto / 3) // este rect sirve como "hitbox" de la piedra, el color esta en el fill, el cuarto valor es la opacidad
        image(img, this.piedraX, this.piedraY, this.piedraAncho * 3, this.piedraAlto * 3)
    }
}
