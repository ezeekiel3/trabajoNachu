let fondoPrincipal
const botonJugar = new Boton("JUGAR", 50, 360, 110, 90, 22, 68, 408)
let desierto
let Jesus
let botonImg
let estado = 0
let pasos = 0
let velJesus = 4
let posXRandom = []
let piedrasImg = []
const posYPiedra = []
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
    posXRandom[i] = Math.round(random(-130, 450))
  }
}


function draw() {
  if (estado === 0) {
    image(fondoPrincipal, 0, 0, 640, 480)
    fill("black")
    textSize(50);
    text("La carrera de Jesus", 100, 50);
    botonJugar.dibujarBoton(botonImg)
  } else if (estado === 1) {
    image(desierto, 0, 0, 640, 480)
    if (keyIsDown(LEFT_ARROW) && (pasos > -70)) {
      pasos--
    }
    if (keyIsDown(RIGHT_ARROW) && (pasos < 60)) {
      pasos++
    }
    image(Jesus, 180 + pasos * velJesus, 240, 300, 250)
    fill("gray")
    rect(300 + pasos * velJesus, 265, 75, 195);
    for (let i = 0; i < piedrasImg.length; i++) {
      posYPiedra.push(startYPiedra + i * offsetYPiedra)
      let posX = posXRandom[i]
      image(piedrasImg[i], posX, posYPiedra[i]++, 350, 350)
      
      if ((posX > (300 + pasos * velJesus) && posX < (300 + pasos * velJesus) + 75) && (posYPiedra[i]++ > 265 && posYPiedra[i]++ < 265 + 195)) {
      console.log("PIEDRA DENTRO DE RECT")
      }
    }
  }
}

function mouseClicked() {
  if ((mouseX > 50 && mouseX < 50 + 110) && (mouseY > 360 && mouseY < 360 + 90)) {
    estado = 1
  }
}
