const map = document.querySelector("#game")
const canvas = map.getContext('2d')
canvas.fillStyle = 'rgb( 0, 128, 0)'

const grid = 15
const PlaerHeight = grid * 3;
const maxPlaerY = map.height - grid - PlaerHeight

const pSpeed = 10
const grav = 7

const L = document.querySelector("#level")
let Level = parseInt(L.textContent)
let colide = true
let jumping = false

const plaer = {
    x: grid * 10,
    y: map.height - grid * 4,
    width: grid,
    height: grid * 3,
    dx: 0,
    dy: grav,
}
const coin = {
    x: grid *2,
    y: grid *2,
    width: grid,
    height: grid

}

const spine1 = {
    x: grid * 10,
    y: grid * 10,
    width: 5,
    height: 5
}
const spine2 = {
    x: grid * 10,
    y: grid * 10,
    width: 5,
    height: 5
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

function levelUp() {
    if (Level === 1){
        block1.x = map.width / 2
        block1.y = map.height - map.height / 4
        block2.x = map.width - grid * 21
        block2.y = map.height / 2
        block3.x = grid
        block3.y = map.height - map.height / 3

        coin.x = block2.x + grid * 10
        coin.y = block2.y - grid * 3

        spine1.x = block2.x + grid * 5
        spine1.y = block2.y - spine1.height
        spine2.x = block3.x + grid * 6
        spine2.y = block3.y - spine2.height
    }
    if (Level === 2){
        block1.x = grid
        block1.y = map.height / 4
        block2.x = map.width / 2 - grid * 15
        block2.y = map.height / 2
        block3.x = map.width - grid - block3.width
        block3.y = map.height - map.height / 4

        coin.x = block1.x + grid * 4
        coin.y = block1.y - grid * 3

        spine1.x = block2.x + grid * 5
        spine1.y = block2.y - spine1.height
        spine2.x = block3.x + grid * 6
        spine2.y = block3.y - spine2.height
    }
    if (Level === 3){
        block1.x = grid * 50
        block1.y = map.height / 6
        block2.x = map.width - grid - block2.width * 2
        block2.y = map.height / 2 - grid
        block3.x = grid + block3.width
        block3.y = map.height - map.height / 4

        coin.x = block1.x + grid * 4
        coin.y = block1.y - grid * 3

        spine1.x = block2.x + grid * 5
        spine1.y = block2.y - spine1.height
        spine2.x = block3.x + grid * 6
        spine2.y = block3.y - spine2.height
    }
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
function renderCS() {
    canvas.fillRect(coin.x, coin.y, coin.width, coin.height)
    canvas.fillRect(spine1.x, spine1.y, spine1.width, spine1.height)
    canvas.fillRect(spine2.x, spine2.y, spine2.width, spine2.height)
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

function resetGame(){
    if (isCollides(plaer, coin)) {
        plaer.x = grid * 10,
        plaer.y = map.height - grid * 4,
        Level ++
        L.textContent = Level
    }
    if (isCollides(plaer, spine1) || isCollides(plaer, spine2)) {
        plaer.x = grid * 10,
        plaer.y = map.height - grid * 4,
        Level = 1
        L.textContent = Level
    }
}

function loop() {
    clearMap()
    
    levelUp()
    renderP()
    renderBs()
    renderCS()

    moveP()

    colligeWisOll()
    
    resetGame()
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