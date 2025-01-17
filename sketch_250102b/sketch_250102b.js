let fondoPrincipal // variable para el fondo principal
const botonJugar = new Boton('JUGAR', 105, 405, 110, 90, 22, 105, 405)
const botonInicio = new Boton('INICIO', 640 / 2, 420, 110, 90, 22, 640 / 2, 415)
const botonInstruccion = new Boton('INSTRUCCIONES', 310, 410, 140, 90, 13, 325, 405)
const botonCreditos = new Boton('CREDITOS', 515, 410, 140, 90, 20, 530, 405)
let desierto // variable para la imagen del desierto
let Jesus // variable para la imagen de Jesus
let botonImg // variable para la imagen del libro
let estado = 0 // 0: pantalla principal, 1: juego...
let pasos = 0 // pasos de Jesus, si se resta se mueve a la izquierda y se suma se mueve a la derecha
let velJesus = 7 // velocidad de Jesus
let vida // variable para la imagen de la vida
let derrotaSonido
let victoriaSonido
let victoriaFondo
let derrotaFondo
let sonidoDesierto
let vidaContador = 3 // cantidad de vida
let posXRandom = [] // Array de las posiciones de las piedras
let piedrasImg = [] // Array para las imagenes de las piedras
let piedrasTocadas = [] // Array para registrar si una piedra ya toco a Jesus
let piedrasProcesadas = 0 // Contador de piedras procesadas
const totalPiedras = 30 // Total de piedras
let velPiedra = 10 // Velocidad de las piedras al caer, si se aumenta el valor caen mas rapido y si se decrementa caen mas lento
let posYPiedra = [] // Array de las posiciones verticales de cada piedra
const piedraAncho = 120
const piedraAlto = 120
let posXJesus // Posicion X de la imagen de Jesus
const anchoJesus = 250
const altoJesus = 200
const startYPiedra = -300 // Posicion Inicial de la piedra
const offsetYPiedra = -100 // Distancia entre cada piedra, si se aumenta el valor menos distancia van a tener, si se decrementa mas distancia van a tener

function preload() {
    // funcion para precargar todas las imagenes
    fondoPrincipal = loadImage('./img/fondoPrincipal.png')
    botonImg = loadImage('./img/libro.png')
    desierto = loadImage('./img/desierto.png')
    Jesus = loadImage('./img/Jesus.png')
    derrotaFondo = loadImage('./img/derrota.png')
    victoriaFondo = loadImage('./img/victoria.png')
    for (let i = 0; i < 30; i++) {
        piedrasImg[i] = loadImage('./img/Piedra.png')
    }
    vida = loadImage('./img/vida.png')
    hit = loadImage('./img/choca.png')
    soundFormats('wav')
    sonidoDesierto = loadSound('./sonidos/desierto.wav')
    derrotaSonido = loadSound('./sonidos/risa.wav')
    victoriaSonido = loadSound('./sonidos/victoria.wav')
}

function setup() {
    createCanvas(640, 480)
    textAlign(CENTER, CENTER)
    for (let i = 0; i < piedrasImg.length; i++) {
        posXRandom[i] = random(-150, 440)
        posYPiedra[i] = startYPiedra + i * offsetYPiedra
        piedrasTocadas[i] = false
    }
}

function draw() {
    switch (estado) {
        case 1:
            image(desierto, 0, 0)
            if (keyIsDown(LEFT_ARROW) && pasos > -40) {
                pasos--
            }
            if (keyIsDown(RIGHT_ARROW) && pasos < 40) {
                pasos++
            }
            posXJesus = 200 + pasos * velJesus
            image(Jesus, posXJesus, 300, 250, 200)

            for (let i = 0; i < piedrasImg.length; i++) {
                let piedraY = posYPiedra[i]++ * velPiedra
                let piedraX = posXRandom[i]
                const rectXJesus = posXJesus + 105
                const rectYJesus = 325
                const rectAnchoJesus = 50
                const rectAltoJesus = 150

                // Dibujar piedra
                const piedra = new Piedra(piedraX, piedraY, piedraAncho, piedraAlto)
                piedra.dibujarPiedra(piedrasImg[i])

                //hitbox de las piedras y Jesus, es para verificar si estan bien ubicados para usarlos en el if, descomentar para testear las ubicaciones
                // fill('gray')
                // rect(piedraX + 155, piedraY + 230, piedraAncho / 3, piedraAlto / 3) // hitbox piedra
                // fill('white')
                // rect(posXJesus + 105, 325, 50, 150) // hitbox Jesus

                if (
                    // esto sirve para detectar la colision, si hay colision entre la hitbox de Jesus y la hitbox de la piedra, se resta una vida y aparece un img de una explosion
                    !piedrasTocadas[i] &&
                    piedraX + 155 + piedraAncho / 3 > rectXJesus &&
                    piedraX + 155 < posXJesus + 105 + rectAnchoJesus &&
                    piedraY + 230 + piedraAlto / 3 > rectYJesus &&
                    piedraY + 230 < rectYJesus + rectAltoJesus
                ) {
                    image(hit, 40, 0)
                    piedrasTocadas[i] = true
                    vidaContador--
                    piedrasProcesadas++ // Incrementar contador de piedras procesadas
                }

                if (piedraY > height && !piedrasTocadas[i]) {
                    piedrasTocadas[i] = true // Marcar como procesada
                    piedrasProcesadas++ // Incrementar contador al salir de pantalla
                }
            }

            fill('green')
            rect(10, height - (height - 10), (piedrasProcesadas / totalPiedras) * (width - 20), 10) // BARRA VERDE
            noFill()
            stroke('white')
            rect(10, height - (height - 10), width - 20, 10) // Marco de la barra

            if (piedrasProcesadas === totalPiedras) {
                estado = 4
                // REINICIAR LAS PIEDRAS
                for (let i = 0; i < piedrasImg.length; i++) {
                    posXRandom[i] = random(-150, 440)
                    posYPiedra[i] = startYPiedra + i * offsetYPiedra
                    piedrasTocadas[i] = false
                }
                vidaContador = 3
            }

            switch (vidaContador) {
                case 3:
                    image(vida, 0, 430, 70, 40)
                    image(vida, 40, 430, 70, 40)
                    image(vida, 80, 430, 70, 40)
                    break
                case 2:
                    image(vida, 0, 430, 70, 40)
                    image(vida, 40, 430, 70, 40)
                    break
                case 1:
                    image(vida, 0, 430, 70, 40)
                    break
                default:
                    estado = 5
                    vidaContador = 3
                    piedrasProcesadas = 0
                    // REINICIAR LAS PIEDRAS
                    for (let i = 0; i < piedrasImg.length; i++) {
                        posXRandom[i] = random(-150, 440)
                        posYPiedra[i] = startYPiedra + i * offsetYPiedra
                        piedrasTocadas[i] = false
                    }
                    break
            }
            break
        case 2:
            // PANTALLA DE INSTRUCCION
            background(200)
            fill('black')
            textSize(40)
            text('INSTRUCCIONES', 640 / 2, 40)
            botonInicio.dibujarBoton(botonImg)
            break
        case 3:
            // PANTALLA DE CREDITOS
            background(200)
            fill('black')
            textSize(40)
            text('CREDITOS', 640 / 2, 40)
            botonInicio.dibujarBoton(botonImg)
            break
        case 4:
            // PANTALLA DE VICTORIA
            background(200)
            image(victoriaFondo, 120, 0, 400, 400)
            fill('black')
            textSize(50)
            text('Felicidades, Ganaste', 640 / 2, 40)
            botonInicio.dibujarBoton(botonImg)
            sonidoDesierto.stop()
            if (!victoriaSonido.isPlaying()) {
                victoriaSonido.play()
            }
            piedrasProcesadas = 0
            break
        case 5:
            // PANTALLA DE DERROTA
            background(200)
            image(derrotaFondo, 110, -200)
            fill('black')
            textSize(50)
            text('Fuiste Derrotado', 640 / 2, 40)
            botonInicio.dibujarBoton(botonImg)
            sonidoDesierto.stop()
            if (!derrotaSonido.isPlaying()) {
                derrotaSonido.play()
            }
            break
        default:
            image(fondoPrincipal, 0, 0, 640, 480)
            fill('black')
            textSize(50)
            text('La carrera de Jesus', 640 / 2, 50)
            botonJugar.dibujarBoton(botonImg)
            botonInstruccion.dibujarBoton(botonImg)
            botonCreditos.dibujarBoton(botonImg)
            break
    }
}

function mouseClicked() {
    if (mouseX > 50 && mouseX < 50 + 110 && mouseY > 360 && mouseY < 360 + 90 && estado === 0) {
        // CLICK PARA JUGAR
        estado = 1
        sonidoDesierto.loop()
    } else if (mouseX > 260 && mouseX < 260 + 130 && mouseY > 365 && mouseY < 365 + 90 && estado === 0) {
        // PANTALLA DE INSTRUCCIONES
        estado = 2
    } else if (mouseX > 465 && mouseX < 465 + 130 && mouseY > 365 && mouseY < 365 + 90 && estado === 0) {
        // PANTALLA DE CREDITOS
        estado = 3
    } else if (
        mouseX > 265 &&
        mouseX < 265 + 110 &&
        mouseY > 370 &&
        mouseY < 370 + 90 &&
        (estado === 4 || estado === 5)
    ) {
        // CLICK EN LA PANTALLA DE VICTORIA Y DERROTA
        estado = 0
        victoriaSonido.stop()
        derrotaSonido.stop()
    }
    getAudioContext().resume()
}
