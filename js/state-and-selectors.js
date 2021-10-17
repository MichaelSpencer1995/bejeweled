const startButton = document.getElementById('start')
const gameBoard = document.getElementById('game-board')
// startButton.addEventListener('click', startGame)
let state = {
    model: [],
    move1: {
        isActive: false,
        id: null
    },
    move2: {
        isActive: false,
        id: null
    },
    jewelActive: false
}