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
let piedrasTocadas = []
let velPiedra = 8
let posYPiedra = []
let posXJesus
const startYPiedra = -300
const offsetYPiedra = -120

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
        posXRandom[i] = random(-130, 450)
        posYPiedra[i] = startYPiedra + i * offsetYPiedra
        piedrasTocadas[i] = false
    }
}

function draw() {
    if (estado === 0) {
        image(fondoPrincipal, 640 / 2, 480 / 2, 640, 480)
        fill('black')
        textSize(50)
        text('La carrera de Jesus', 100, 50)
        botonJugar.dibujarBoton(botonImg)
    } else if (estado === 1) {
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

            // Dimensiones ajustadas de las piedras
            let piedraAncho = 220 // Cambia según el tamaño visual
            let piedraAlto = 220 // Cambia según el tamaño visual

            // Dibujar piedra
            image(piedrasImg[i], piedraX + 35, piedraY - 35, 350, 350)
            // fill(0, 255, 73, 50)
            // rect(piedraX, piedraY, piedraAncho / 4, piedraAlto / 4)
            // fill('blue')
            // rect(posXJesus, 330, 45, 140)

            if (
                !piedrasTocadas[i] &&
                piedraX + piedraAncho / 4 > posXJesus && // Borde derecho de la piedra cruza borde izquierdo del rectángulo
                piedraX < posXJesus + 45 && // Borde izquierdo de la piedra cruza borde derecho del rectángulo
                piedraY + piedraAlto / 4 > 330 && // Borde inferior de la piedra cruza borde superior del rectángulo
                piedraY < 330 + 140 // Borde superior de la piedra cruza borde inferior del rectángulo
            ) {
                image(hit, 640 / 2, 480 / 2)
                piedrasTocadas[i] = true
                vidaContador--
            }
        }
        if (vidaContador === 3) {
            image(vida, 30, 450, 70, 40)
            image(vida, 65, 450, 70, 40)
            image(vida, 100, 450, 70, 40)
        } else if (vidaContador === 2) {
            image(vida, 30, 450, 70, 40)
            image(vida, 65, 450, 70, 40)
        } else if (vidaContador === 1) {
            image(vida, 30, 450, 70, 40)
        } else {
            estado = 4
        }
    } else if (estado === 4) {
        // PANTALLA DE DERROTA
        vidaContador = 3
        background(100)
        fill('black')
        textSize(50)
        text('PERDISTE GATO', 120, 480 / 2)
        botonInicio.dibujarBoton(botonImg)
    }
}

function mouseClicked() {
    if (mouseX > 50 && mouseX < 50 + 110 && mouseY > 360 && mouseY < 360 + 90) {
        estado = 1
    } else if (mouseX > 270 && mouseX < 270 + 105 && mouseY > 375 && mouseY < 375 + 90) {
        estado = 0
    }
}
