let fondoPrincipal // variable para el fondo principal
const botonJugar = new Boton('JUGAR', 105, 405, 110, 90, 22)
const botonInicio = new Boton('INICIO', 640 / 2, 420, 110, 90, 22)
// const botonInstruccion = new Boton('INSTRUCCIONES', 310, 410, 140, 90, 13)
// const botonCreditos = new Boton('CREDITOS', 515, 410, 140, 90, 20)
let desierto // variable para la imagen del desierto
let Jesus // variable para la imagen de Jesus
let botonImg // variable para la imagen del libro
let estado = 0 // 0: pantalla principal, 1: juego...
let pasos = 0 // pasos de Jesus, si se resta se mueve a la izquierda y se suma se mueve a la derecha
let velJesus = 5 // velocidad de Jesus
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
let velPiedra = 8 // Velocidad de las piedras al caer, si se aumenta el valor caen mas rapido y si se decrementa caen mas lento
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
    rectMode(CENTER)
    imageMode(CENTER)
    textAlign(CENTER, CENTER)
    for (let i = 0; i < piedrasImg.length; i++) {
        posXRandom[i] = random(20, 650)
        posYPiedra[i] = startYPiedra + i * offsetYPiedra
        piedrasTocadas[i] = false
    }
}

function draw() {
    switch (estado) {
        case 1:
            image(desierto, 640 / 2, 480 / 2)
            if (keyIsDown(LEFT_ARROW) && pasos > -35) {
                pasos--
            }
            if (keyIsDown(RIGHT_ARROW) && pasos < 80) {
                pasos++
            }
            posXJesus = 180 + pasos * velJesus
            image(Jesus, posXJesus + 20, 400, 250, 200)

            for (let i = 0; i < piedrasImg.length; i++) {
                let piedraY = posYPiedra[i]++ * velPiedra
                let piedraX = posXRandom[i]
                const rectXJesus = posXJesus + 25
                const rectYJesus = 400
                const rectAnchoJesus = 50
                const rectAltoJesus = 150

                // Dibujar piedra
                const piedra = new Piedra(piedraX, piedraY, piedraAncho, piedraAlto)
                piedra.dibujarPiedra(piedrasImg[i])

                //hitbox de las piedras y Jesus, es para verificar si estan bien ubicados para usarlos en el if, descomentar para testear las ubicaciones
                // fill('gray')
                // rect(piedraX - 5, piedraY + 65, piedraAncho / 3 + 10, piedraAlto / 3) // hitbox piedra
                // fill('white')
                // rect(posXJesus + 25, 400, 50, 150) // hitbox Jesus

                if (
                    // esto sirve para detectar la colision, si hay colision entre la hitbox de Jesus y la hitbox de la piedra, se resta una vida y aparece un img de una explosion
                    !piedrasTocadas[i] &&
                    piedraX - 5 + piedraAncho / 3 + 10 > rectXJesus &&
                    piedraX - 5 < posXJesus + 25 + rectAnchoJesus &&
                    piedraY + 65 + piedraAlto / 3 > rectYJesus &&
                    piedraY + 65 < rectYJesus + rectAltoJesus
                ) {
                    image(hit, 640 / 2, 480 / 2)
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
            rect(640 / 2, height - (height - 10), (piedrasProcesadas / totalPiedras) * (width - 20), 10)
            noFill()
            stroke('white')
            rect(640 / 2, height - (height - 10), width - 20, 10) // Marco de la barra

            if (piedrasProcesadas === totalPiedras) {
                estado = 2
                // REINICIAR LAS PIEDRAS
                for (let i = 0; i < piedrasImg.length; i++) {
                    posXRandom[i] = random(0, 580)
                    posYPiedra[i] = startYPiedra + i * offsetYPiedra
                    piedrasTocadas[i] = false
                }
            }

            switch (vidaContador) {
                case 3:
                    image(vida, 30, 450, 70, 40)
                    image(vida, 65, 450, 70, 40)
                    image(vida, 100, 450, 70, 40)
                    break
                case 2:
                    image(vida, 30, 450, 70, 40)
                    image(vida, 65, 450, 70, 40)
                    break
                case 1:
                    image(vida, 30, 450, 70, 40)
                    break
                default:
                    estado = 4
                    vidaContador = 3
                    piedrasProcesadas = 0
                    // REINICIAR LAS PIEDRAS
                    for (let i = 0; i < piedrasImg.length; i++) {
                        posXRandom[i] = random(0, 580)
                        posYPiedra[i] = startYPiedra + i * offsetYPiedra
                        piedrasTocadas[i] = false
                    }
                    break
            }
            break
        case 2:
            // PANTALLA DE INSTRUCCION
            background(200)
            break
        case 3:
            // PANTALLA DE CREDITOS
            background(200)
            break
        case 4:
            // PANTALLA DE VICTORIA
            background(200)
            image(victoriaFondo, 640 / 2, 480 / 3, 400, 400)
            fill('black')
            textSize(50)
            text('Felicidades, Ganaste', 640 / 2, 40)
            botonInicio.dibujarBoton(botonImg)
            sonidoDesierto.stop()
            if (!victoriaSonido.isPlaying()) {
                victoriaSonido.play()
            }
            break
        case 5:
            // PANTALLA DE DERROTA
            background(200)
            image(derrotaFondo, 640 / 2, 480 / 4)
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
            image(fondoPrincipal, 640 / 2, 480 / 2, 640, 480)
            textSize(16)
            fill(0) // Color del texto
            text(`X: ${mouseX}, Y: ${mouseY}`, 60, 20)
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
    if (mouseX > 50 && mouseX < 50 + 110 && mouseY > 360 && mouseY < 360 + 90) {
        estado = 1
        sonidoDesierto.loop()
    } else if (mouseX > 270 && mouseX < 270 + 105 && mouseY > 375 && mouseY < 375 + 90 && estado !== 1) {
        estado = 0
        derrotaSonido.stop()
        victoriaSonido.stop()
    }
    getAudioContext().resume()
    console.log('AudioContext desbloqueado')
}
