// document.body.style.zoom = "80%"

initModel(dev)
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
            let icon = document.createElement('i')
            jewelOuter.classList.add('jewel-outer')
            jewelOuter.id = id
            id++
            jewelInner.classList.add('jewel-inner')
            jewelInner.appendChild(icon)
            jewelOuter.appendChild(jewelInner)
            col.appendChild(jewelOuter)
        }
        gameBoard.appendChild(col)
    }
    setUpJewelListeners()
    setupButtons()
    score.innerHTML = state.score
}



function initModel(debug) {
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
                potentialScorer: false,
                open: false,
                originalCoors: null,
                pointScorer: false
            }
            state.model.push(jewel)
            id++
        }
    }
    if(debug) {
        let colors = [0,1,2,3,4,5,6]
        if(settings.maxPoints) {
            for(let i=0; i<64; i++) {
                if(i % 3 == 0) { state.model[i].color = colors[0] }
                if(i % 3 == 1) { state.model[i].color = colors[2] }
                if(i % 3 == 2) { state.model[i].color = colors[4] }
            }
            for(let i=0; i<64; i++) {
                if(i<=1||i>=8&&i<=10||i>=16&&i<=19||i>= 24&&i<=39||i>= 40&&i<=43||i>= 48&&i<=50||i>= 56&&i<=57){
                    state.model[i].color = colors[6]
                }
                if(i==18||i==42) {state.model[i].color = colors[5]}
            }
        }
        if(settings.horAndVer) {
            let c1 = 6
            let c2 = 4
            let c3 = 5
            state.model[34].color = colors[colors[c2]]
            state.model[35].color = colors[colors[c2]]
            state.model[36].color = colors[colors[c1]]
            state.model[37].color = colors[colors[c2]]
            state.model[20].color = colors[colors[c2]]
            state.model[28].color = colors[colors[c2]]
            state.model[45].color = colors[colors[c1]]
            state.model[53].color = colors[colors[c1]]
            state.model[33].color = colors[colors[c3]]
            state.model[38].color = colors[colors[c3]]
            state.model[39].color = colors[colors[c3]]
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

function setupButtons() {
    muteButton.addEventListener('click', () => {
        state.mute = !state.mute
        console.warn(state.mute)
        if(state.mute) {
            document.getElementById('mute').classList.add('toggle-mute')
        } else {
            document.getElementById('mute').classList.remove('toggle-mute')

        }
    })
}