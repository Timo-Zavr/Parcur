const map = document.querySelector("#game")
const canvas = map.getContext('2d')
canvas.fillStyle = 'rgb( 0, 128, 0)'

const grid = 15
const PlaerHeight = grid * 3;
const maxPlaerY = map.height - grid - PlaerHeight

const pSpeed = 7
const grav = 7

const plaer = {
    x: grid * 10,
    y: map.height - grid * 4,
    width: grid,
    height: grid * 3,
    dx: 0,
    dy: grav,
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
function moveP() {
    plaer.x += plaer.dx
}
function gravity() {
    plaer.y += plaer.dy
}
function colligeWisOll() {
    if (plaer.y < grid){
        plaer.y = grid
    } else if(plaer.y > maxPlaerY){
        plaer.y = maxPlaerY
    }
}

function loop() {
    clearMap()

    renderP()

    gravity()
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
    if (event.key === 'w' || event.key === 'ц' && plaer.y > maxPlaerY) {
        plaer.dy = -pSpeed*4
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