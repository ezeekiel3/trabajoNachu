class Juego {
    constructor() {
        this.fondoPrincipal // variable para el fondo principal
        this.botonJugar = new Boton('JUGAR', 105, 405, 110, 90, 22, 105, 405)
        this.botonInicio = new Boton('INICIO', 640 / 2, 420, 110, 90, 22, 640 / 2, 415)
        this.jesus = new Jugador(200, 300, 250, 200, 5)
        this.botonInstruccion = new Boton('INSTRUCCIONES', 310, 410, 140, 90, 13, 325, 405)
        this.botonCreditos = new Boton('CREDITOS', 515, 410, 140, 90, 20, 530, 405)
        this.desierto
        this.Jesus
        this.botonImg
        this.estado = 0
        this.pasos = 0
        this.velJesus = 5
        this.vida
        this.derrotaSonido
        this.victoriaSonido
        this.victoriaFondo
        this.derrotaFondo
        this.sonidoDesierto
        this.vidaContador = 3
        this.posXRandom = []
        this.piedrasImg = []
        this.piedrasTocadas = []
        this.piedrasProcesadas = 0
        this.totalPiedras = 30
        this.velPiedra = 8
        this.posYPiedra = []
        this.piedraAncho = 120
        this.piedraAlto = 120
        this.posXJesus
        this.anchoJesus = 250
        this.altoJesus = 200
        this.startYPiedra = -300
        this.offsetYPiedra = -100
    }

    cargarImagenesYSonidos() {
        this.fondoPrincipal = loadImage('./img/fondoPrincipal.png')
        this.botonImg = loadImage('./img/libro.png')
        this.desierto = loadImage('./img/desierto.png')
        this.Jesus = loadImage('./img/Jesus.png')
        this.derrotaFondo = loadImage('./img/derrota.png')
        this.victoriaFondo = loadImage('./img/victoria.png')
        for (let i = 0; i < 30; i++) {
            this.piedrasImg[i] = loadImage('./img/Piedra.png')
        }
        this.vida = loadImage('./img/vida.png')
        this.hit = loadImage('./img/choca.png')
        soundFormats('wav')
        this.sonidoDesierto = loadSound('./sonidos/desierto.wav')
        this.derrotaSonido = loadSound('./sonidos/risa.wav')
        this.victoriaSonido = loadSound('./sonidos/victoria.wav')
    }

    inicio() {
        createCanvas(640, 480)
        textAlign(CENTER, CENTER)
        for (let i = 0; i < this.piedrasImg.length; i++) {
            this.posXRandom[i] = random(-150, 440)
            this.posYPiedra[i] = this.startYPiedra + i * this.offsetYPiedra
            this.piedrasTocadas[i] = false
        }
    }

    funcionDraw() {
        switch (this.estado) {
            case 1:
                image(this.desierto, 0, 0)
                if (keyIsDown(LEFT_ARROW) && this.pasos > -20) {
                    this.pasos--
                }
                if (keyIsDown(RIGHT_ARROW) && this.pasos < 95) {
                    this.pasos++
                }
                this.posXJesus = 105 + this.pasos * this.velJesus
                this.jesus.mover()
                this.jesus.dibujar(this.Jesus)
                for (let i = 0; i < this.piedrasImg.length; i++) {
                    let piedraY = this.posYPiedra[i]++ * this.velPiedra
                    let piedraX = this.posXRandom[i]
                    const rectXJesus = this.posXJesus
                    const rectYJesus = 325
                    const rectAnchoJesus = 50
                    const rectAltoJesus = 150

                    // Dibujar piedra
                    const piedra = new Piedra(piedraX, piedraY, this.piedraAncho, this.piedraAlto)
                    piedra.dibujarPiedra(this.piedrasImg[i])

                    //hitbox de las piedras y Jesus, es para verificar si estan bien ubicados para usarlos en el if, descomentar para testear las ubicaciones
                    // fill('gray')
                    // rect(this.piedraX + 155, this.piedraY + 230, this.piedraAncho / 3, this.piedraAlto / 3) // hitbox piedra
                    // fill('white')
                    // rect(this.posXJesus, 325, 50, 150) // hitbox Jesus

                    if (
                        // esto sirve para detectar la colision, si hay colision entre la hitbox de Jesus y la hitbox de la piedra, se resta una vida y aparece un img de una explosion
                        !this.piedrasTocadas[i] &&
                        piedraX + 155 + this.piedraAncho / 3 > rectXJesus &&
                        piedraX + 155 < this.posXJesus + rectAnchoJesus &&
                        piedraY + 230 + this.piedraAlto / 3 > rectYJesus &&
                        piedraY + 230 < rectYJesus + rectAltoJesus
                    ) {
                        image(this.hit, 40, 0)
                        this.piedrasTocadas[i] = true
                        this.vidaContador--
                        this.piedrasProcesadas++ // Incrementar contador de piedras procesadas
                    }

                    if (piedraY > height && !this.piedrasTocadas[i]) {
                        this.piedrasTocadas[i] = true // Marcar como procesada
                        this.piedrasProcesadas++ // Incrementar contador al salir de pantalla
                    }
                }

                fill('green')
                rect(10, height - (height - 10), (this.piedrasProcesadas / this.totalPiedras) * (width - 20), 10) // BARRA VERDE
                noFill()
                stroke('white')
                rect(10, height - (height - 10), width - 20, 10) // Marco de la barra

                if (this.piedrasProcesadas === this.totalPiedras) {
                    this.estado = 4
                    // REINICIAR LAS PIEDRAS
                    for (let i = 0; i < this.piedrasImg.length; i++) {
                        this.posXRandom[i] = random(-150, 440)
                        this.posYPiedra[i] = this.startYPiedra + i * this.offsetYPiedra
                        this.piedrasTocadas[i] = false
                    }
                    this.vidaContador = 3
                }

                switch (this.vidaContador) {
                    case 3:
                        image(this.vida, 0, 430, 70, 40)
                        image(this.vida, 40, 430, 70, 40)
                        image(this.vida, 80, 430, 70, 40)
                        break
                    case 2:
                        image(this.vida, 0, 430, 70, 40)
                        image(this.vida, 40, 430, 70, 40)
                        break
                    case 1:
                        image(this.vida, 0, 430, 70, 40)
                        break
                    default:
                        this.estado = 5
                        this.vidaContador = 3
                        this.piedrasProcesadas = 0
                        // REINICIAR LAS PIEDRAS
                        for (let i = 0; i < this.piedrasImg.length; i++) {
                            this.posXRandom[i] = random(-150, 440)
                            this.posYPiedra[i] = this.startYPiedra + i * this.offsetYPiedra
                            this.piedrasTocadas[i] = false
                        }
                        break
                }
                break
            case 2:
                // PANTALLA DE INSTRUCCIONES
                background(200)
                fill('black')
                textSize(40)
                text('Debes esquivar los obstaculos con', 310, 40)
                text('las teclas de flecha izquierda y', 280, 90)
                text('derecha hasta que llegues a la ', 285, 140)
                text('meta', 50, 190)

                this.botonInicio.dibujarBoton(this.botonImg)
                break
            case 3:
                // PANTALLA DE CREDITOS
                background(200)
                fill('black')
                textSize(40)
                text('Nazarena Chaparro', 300, 40)
                text('Comision 2', 300, 90)
                text('Legajo 91573/6', 300, 140)
                textSize(38)
                text('Super libro de Tatsunoko Production', 320, 190)
                textSize(40)
                text('diseñada por Freepik', 300, 240)
                this.botonInicio.dibujarBoton(this.botonImg)
                break
            case 4:
                // PANTALLA DE VICTORIA
                background(200)
                let textoVictoria = new Texto('Felicidades, Ganaste', 640 / 2, 40, 50, 'black')
                textoVictoria.dibujarTexto()
                image(this.vida, 0, 20) // corazon victoria
                this.botonInicio.dibujarBoton(this.botonImg)
                this.sonidoDesierto.stop()
                if (!this.victoriaSonido.isPlaying()) {
                    this.victoriaSonido.play()
                }
                this.piedrasProcesadas = 0
                break
            case 5:
                // PANTALLA DE DERROTA
                background(200)
                image(this.victoriaFondo, 80, 0) // imagen cruz
                let textoDerrota = new Texto('Fuiste Derrotado', 640 / 2, 40, 50, 'black')
                textoDerrota.dibujarTexto()
                this.botonInicio.dibujarBoton(this.botonImg)
                this.sonidoDesierto.stop()
                if (!this.derrotaSonido.isPlaying()) {
                    this.derrotaSonido.play()
                }
                break
            default:
                image(this.fondoPrincipal, 0, 0, 640, 480)
                let titulo = new Texto('La carrera de Jesus', 640 / 2, 50, 50, 'black')
                titulo.dibujarTexto()
                this.botonJugar.dibujarBoton(this.botonImg)
                this.botonInstruccion.dibujarBoton(this.botonImg)
                this.botonCreditos.dibujarBoton(this.botonImg)
                break
        }
    }

    modificarEstado(num) {
        this.estado = num
    }

    obtenerEstado() {
        return this.estado
    }

    sonidoDesiertoLoop() {
        this.sonidoDesierto.loop()
    }

    sonidoVictoriaStop() {
        this.victoriaSonido.stop()
    }

    sonidoDerrotaStop() {
        this.derrotaSonido.stop()
    }
}
