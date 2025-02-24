const juegoRaiz = new Juego()

function preload() {
    juegoRaiz.cargarImagenesYSonidos()
}

function setup() {
    juegoRaiz.inicio()
}

function draw() {
    juegoRaiz.funcionDraw()
}

function mouseClicked() {
    if (mouseX > 50 && mouseX < 50 + 110 && mouseY > 360 && mouseY < 360 + 90 && juegoRaiz.obtenerEstado() === 0) {
        // CLICK PARA JUGAR
        juegoRaiz.modificarEstado(1)
        juegoRaiz.sonidoDesiertoLoop()
    } else if (
        mouseX > 260 &&
        mouseX < 260 + 130 &&
        mouseY > 365 &&
        mouseY < 365 + 90 &&
        juegoRaiz.obtenerEstado() === 0
    ) {
        // PANTALLA DE INSTRUCCIONES
        juegoRaiz.modificarEstado(2)
    } else if (
        mouseX > 465 &&
        mouseX < 465 + 130 &&
        mouseY > 365 &&
        mouseY < 365 + 90 &&
        juegoRaiz.obtenerEstado() === 0
    ) {
        // PANTALLA DE CREDITOS
        juegoRaiz.modificarEstado(3)
    } else if (
        mouseX > 265 &&
        mouseX < 265 + 110 &&
        mouseY > 370 &&
        mouseY < 370 + 90 &&
        (juegoRaiz.obtenerEstado() === 4 ||
            juegoRaiz.obtenerEstado() === 5 ||
            juegoRaiz.obtenerEstado() === 2 ||
            juegoRaiz.obtenerEstado() === 3)
    ) {
        // CLICK EN LA PANTALLA DE VICTORIA, DERROTA, INSTRUCCIONES Y CREDITOS
        juegoRaiz.modificarEstado(0)
        juegoRaiz.sonidoDerrotaStop()
        juegoRaiz.sonidoVictoriaStop()
    }
    getAudioContext().resume()
}
