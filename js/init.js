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
                    id: id,
                    isActive: false
                }),
                potentialScorer: false
            }
            state.model.push(jewel)
            id++
        }
    }
}

function setUpJewelListeners() {
    let jewels = document.querySelectorAll('.jewel-outer')
    jewels.forEach(jewel => {
        jewel.addEventListener('click', handleJewelClicked)
        jewel.addEventListener('transitionend', handleAnimationEnded);
    })
}