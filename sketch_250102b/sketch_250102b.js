let fondoPrincipal
const botonJugar = new Boton('JUGAR', 50, 360, 110, 90, 22, 68, 408)
let desierto
let Jesus
let botonImg
let estado = 0
let pasos = 0
let velJesus = 4
let posXRandom = []
let piedrasImg = []
let posYPiedra = []
const startYPiedra = -300
const offsetYPiedra = -150

function preload() {
    fondoPrincipal = loadImage('./img/fondoPrincipal.png')
    botonImg = loadImage('./img/libro.png')
    desierto = loadImage('./img/desierto.png')
    Jesus = loadImage('./img/Jesus.png')
    for (let i = 0; i < 30; i++) {
        piedrasImg[i] = loadImage('./img/Piedra.png')
    }
}

function setup() {
    createCanvas(640, 480)
    for (let i = 0; i < piedrasImg.length; i++) {
        posXRandom[i] = random(-130, 450)
        posYPiedra[i] = startYPiedra + i * offsetYPiedra
    }
}

function draw() {
    if (estado === 0) {
        image(fondoPrincipal, 0, 0, 640, 480)
        fill('black')
        textSize(50)
        text('La carrera de Jesus', 100, 50)
        botonJugar.dibujarBoton(botonImg)
    } else if (estado === 1) {
        image(desierto, 0, 0, 640, 480)
        if (keyIsDown(LEFT_ARROW) && pasos > -70) {
            pasos--
        }
        if (keyIsDown(RIGHT_ARROW) && pasos < 60) {
            pasos++
        }
        image(Jesus, 180 + pasos * velJesus, 240, 300, 250)

        let rectX = 300 + pasos * velJesus
        let rectY = 265
        let rectAncho = 75
        let rectAlto = 195
        fill('gray')
        rect(rectX, rectY, rectAncho, rectAlto)
        for (let i = 0; i < piedrasImg.length; i++) {
            let piedraY = posYPiedra[i]++
            let piedraX = posXRandom[i]
            image(piedrasImg[i], piedraX, piedraY, 350, 350)

            if (
                piedraX + 350 >= rectX && // Borde derecho de la piedra
                piedraX <= rectX + rectAncho && // Borde izquierdo de la piedra
                piedraY + 350 >= rectY && // Borde inferior de la piedra
                piedraY <= rectY + rectAlto // Borde superior de la piedra
            ) {
                console.log('PIEDRA DENTRO DE RECT')
            }
        }
    }
}

function mouseClicked() {
    if (mouseX > 50 && mouseX < 50 + 110 && mouseY > 360 && mouseY < 360 + 90) {
        estado = 1
    }
}
