const map = document.querySelector("#game")
const canvas = map.getContext('2d')
canvas.fillStyle = 'rgb( 0, 128, 0)'

const grid = 15
const PlaerHeight = grid * 3;
const maxPlaerY = map.height - grid - PlaerHeight

let jumping = false
const pSpeed = 10
const grav = 7
let colide = true

const plaer = {
    x: grid * 10,
    y: map.height - grid * 4,
    width: grid,
    height: grid * 3,
    dx: 0,
    dy: grav,
}

const block1 = {
    x: map.width / 2,
    y: map.height - map.height / 4,
    width: grid * 10,
    height: grid,
}
const block2 = {
    x: map.width - grid * 21,
    y: map.height / 2,
    width: grid * 20,
    height: grid,
}
const block3 = {
    x: grid,
    y: map.height - map.height / 3,
    width: grid * 15,
    height: grid,
}

function renderMap() {
    canvas.fillRect(0, 0, map.width, grid); // Верхняя граница
    canvas.fillRect(0, map.height - grid, map.width, grid) // Нижняя граница
    canvas.fillRect(0, 0, grid, map.height) // Левая граница
    canvas.fillRect(map.width - grid, 0, grid, map.height) // Правая граница
}
function clearMap() {
    canvas.clearRect(0, 0, map.width, map.height);
}
function renderP() {
    canvas.fillRect(plaer.x, plaer.y, plaer.width, plaer.height)
}
function renderBs() {
    canvas.fillRect(block1.x, block1.y, block1.width, block1.height)
    canvas.fillRect(block2.x, block2.y, block2.width, block2.height)
    canvas.fillRect(block3.x, block3.y, block3.width, block3.height)
}
function moveP() {
    plaer.x += plaer.dx
    plaer.y += plaer.dy
}
function isCollides(object1, object2) {
    const width1 = object1.x + object1.width;
    const width2 = object2.x + object2.width;
    const height1 = object1.y + object1.height;
    const height2 = object2.y + object2.height;
    return object1.x < width2
        && object2.x < width1
        && object1.y < height2
        && object2.y < height1;
}
function colligeWisOll() {
    if (plaer.y < grid){
        plaer.y = grid
        jumping = true
        colide = false
    } else if(plaer.y > maxPlaerY){
        plaer.y = maxPlaerY
        colide = true
    }    

    if (plaer.x < grid){
        plaer.x = grid
    } else if (plaer.x > map.width - grid*2){
        plaer.x = map.width - grid*2
    }

    if (isCollides(plaer, block1)) {
        plaer.dy = plaer.dy;
        plaer.y = block1.y - plaer.height;
        colide = true
    }
    if (isCollides(plaer, block2)) {
        plaer.dy = plaer.dy;
        plaer.y = block2.y - plaer.height;
        colide = true
    }
    if (isCollides(plaer, block3)) {
        plaer.dy = plaer.dy;
        plaer.y = block3.y - plaer.height;
        colide = true
    }
}

function loop() {
    clearMap()

    renderP()
    renderBs()

    moveP()

    colligeWisOll()
    
    renderMap()
    requestAnimationFrame(loop)
}


document.addEventListener('keydown', (event) => {
    if (event.key === 'd' || event.key === 'в') {
        plaer.dx = +pSpeed
    } else if (event.key === 'a' || event.key === 'ф'){
        plaer.dx = -pSpeed
    }
})
document.addEventListener('keyup', (event) => {
    if (event.key === 'd' || event.key === 'в' || event.key === 'a' || event.key === 'ф') {
        plaer.dx = 0;
    }
})


document.addEventListener('keydown', (event) => {
    if ((event.key === 'w' || event.key === 'ц') && colide === true && !jumping) {
        plaer.dy = -grav*4
        colide = false
        jumping = true
    }
})
document.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 'ц' ) {
        plaer.dy = grav
        jumping = false
    }
})



document.addEventListener('keydown', (event) => {
    if (event.key === 'f' || event.key === 'а') {
        fs()
    }
})
function fs(){
    if (!document.fullscreenElement){
        document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen){
        document.exitFullscreen()
    }
}

requestAnimationFrame(loop)