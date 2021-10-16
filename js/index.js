const startButton = document.getElementById('start')
const gameBoard = document.getElementById('game-board')
// let model = []
// startButton.addEventListener('click', startGame)
let state = {
    model: [],
    move1: null,
    move2: null
}

initModel()
initDom()
drawModel()



function initDom() {
    let id = 0
    for(let i=0; i<8; i++) {
        let col = document.createElement('div')
        col.classList.add('col')
        col.classList.add('col-' + i)
        for(let j=0; j<8; j++) {
            let jewelOuter = document.createElement('div')
            let jewelInner = document.createElement('div')
            jewelOuter.classList.add('jewel-outer')
            jewelOuter.id = id
            id++
            jewelInner.classList.add('jewel-inner')
            jewelOuter.appendChild(jewelInner)
            col.appendChild(jewelOuter)
        }
        gameBoard.appendChild(col)
    }
    setUpJewelListeners()
}

function setUpJewelListeners() {
    let jewels = document.querySelectorAll('.jewel-outer')
    jewels.forEach(jewel => {
        jewel.addEventListener('click', handleJewelClicked)
    })
}

function handleJewelClicked() {
    console.log('jewel', this.id)
}

function drawModel() {
    for(let i=0; i<8; i++) {
        const jewels = document.querySelectorAll(`.col-${i} .jewel-inner`)
        state.model.forEach(jewel => {
            if(jewel.x == i) {
                jewels[jewel.y].classList.add(`jewel-${jewel.color}`)
                // jewels[jew.y].innerHTML = jew.id
            }
        })
    }
}

function initModel() {
    let id = 0
    for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
            let jewel = {
                x: i,
                y: j,
                id: id,
                color: setColor({
                    x: i,
                    y: j,
                    id: id
                })
            }
            state.model.push(jewel)
            id++
        }
    }
}

function setColor(cur) {
    let vertical = []
    let horizontal = []
    state.model.forEach(jewel => {
        if(jewel.x == cur.x - 1 && jewel.y == cur.y) {
            horizontal.push(jewel)
        }
        if(jewel.x == cur.x - 2 && jewel.y == cur.y) {
            horizontal.push(jewel)
        }
        if(jewel.x == cur.x && jewel.y == cur.y - 1) {
            vertical.push(jewel)
        }
        if(jewel.x == cur.x && jewel.y == cur.y - 2) {
            vertical.push(jewel)
        }
    })
    let exceptions = []
    if(vertical.length == 2) {
        if(vertical[0].color == vertical[1].color) {
            exceptions.push(vertical[0].color)
        }
    }
    if(horizontal.length == 2) {
        if(horizontal[0].color == horizontal[1].color) {
            exceptions.push(horizontal[0].color)
        }
    }
    return randomJewel(exceptions)
}

function randomJewel(except) {
    let num = Math.floor(Math.random() * 7)
    return (num === except[0] || num === except[1]) ? randomJewel(except) : num
}