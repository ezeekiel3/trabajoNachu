let fondoPrincipal
const botonJugar = new Boton('JUGAR', 105, 405, 110, 90, 22, 68, 408)
const botonInicio = new Boton('INICIO', 640 / 2, 420, 110, 90, 22, 290, 420)
let desierto
let Jesus
let botonImg
let estado = 0
let pasos = 0
let vida
let vidaContador = 3
let velJesus = 5
let posXRandom = []
let piedrasImg = []
let piedrasTocadas = [] // Array para registrar si una piedra ya tocó a Jesús
let piedrasProcesadas = 0 // Contador de piedras procesadas
const totalPiedras = 30 // Total de piedras
let velPiedra = 8
let posYPiedra = []
let posXJesus
const startYPiedra = -300
const offsetYPiedra = -100

function preload() {
    fondoPrincipal = loadImage('./img/fondoPrincipal.png')
    botonImg = loadImage('./img/libro.png')
    desierto = loadImage('./img/desierto.png')
    Jesus = loadImage('./img/Jesus.png')
    for (let i = 0; i < 30; i++) {
        piedrasImg[i] = loadImage('./img/Piedra.png')
    }
    vida = loadImage('./img/vida.png')
    hit = loadImage('./img/choca.png')
}

function setup() {
    createCanvas(640, 480)
    rectMode(CORNER)
    imageMode(CENTER)
    for (let i = 0; i < piedrasImg.length; i++) {
        posXRandom[i] = random(0, 580)
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

                // Dibujar piedra
                image(piedrasImg[i], piedraX + 35, piedraY - 35, 350, 350)

                if (
                    !piedrasTocadas[i] &&
                    piedraX + 55 > posXJesus && // Borde derecho de la piedra cruza borde izquierdo del rectángulo
                    piedraX < posXJesus + 45 && // Borde izquierdo de la piedra cruza borde derecho del rectángulo
                    piedraY + 55 > 330 && // Borde inferior de la piedra cruza borde superior del rectángulo
                    piedraY < 330 + 140 // Borde superior de la piedra cruza borde inferior del rectángulo
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
            rect(10, height - (height - 10), (piedrasProcesadas / totalPiedras) * (width - 20), 10)
            noFill()
            stroke('white')
            rect(10, height - (height - 10), width - 20, 10) // Marco de la barra

            if (piedrasProcesadas === totalPiedras) {
                estado = 2
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
                    for (let i = 0; i < piedrasImg.length; i++) {
                        posXRandom[i] = random(0, 580)
                        posYPiedra[i] = startYPiedra + i * offsetYPiedra
                        piedrasTocadas[i] = false
                    }
                    break
            }
            break
        case 2:
            // PANTALLA DE VICTORIA
            background(100)
            fill('black')
            textSize(50)
            text('GANASTE, MUY BIEN', 60, 480 / 2)
            botonInicio.dibujarBoton(botonImg)
            break
        case 4:
            // PANTALLA DE DERROTA
            background(100)
            fill('black')
            textSize(50)
            text('PERDISTE GATO', 120, 480 / 2)
            botonInicio.dibujarBoton(botonImg)
            break
        default:
            image(fondoPrincipal, 640 / 2, 480 / 2, 640, 480)
            fill('black')
            textSize(50)
            text('La carrera de Jesus', 100, 50)
            botonJugar.dibujarBoton(botonImg)
            break
    }
}

function mouseClicked() {
    if (mouseX > 50 && mouseX < 50 + 110 && mouseY > 360 && mouseY < 360 + 90) {
        estado = 1
    } else if (mouseX > 270 && mouseX < 270 + 105 && mouseY > 375 && mouseY < 375 + 90 && estado !== 1) {
        estado = 0
    }
}
