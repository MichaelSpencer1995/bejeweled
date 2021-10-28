function shiftJewels(model) {
    model.forEach(jewel => {
        shiftJewel(jewel)
    })
    for(let i=0; i<8; i++) {
        let col = model.filter(j => j.x == i).reverse()
        let nullFound = false
        col.forEach(j => {
            if(j.color && nullFound) {
                shiftJewels(model)
            }
            if(j.color == null) {
                nullFound = true
            }
        })
    }
}

function shiftJewel(jewel) {
    const jewelBelow = getJewelInModelBy('coors', [jewel.x, jewel.y + 1], true)
    if(jewelBelow) {
        if(jewelBelow.color == null) {
            if(!jewel.originalCoors) {
                jewelBelow.originalCoors = [jewel.x, jewel.y]
            } else {
                jewelBelow.originalCoors = jewel.originalCoors
                jewel.originalCoors = null
            }
            const c1 = jewel.color
            const c2 = jewelBelow.color
            jewel.color = c2
            jewelBelow.color = c1
        }
    }
}

function createNextModel() {
    state.nextModel = []
    let curJew
    state.model.forEach(jewel => {
        curJew = Object.assign({}, jewel)
        if(state.scoringPieces.indexOf(jewel.id) >= 0) {
            curJew.color = null
        }
        state.nextModel.push(curJew)
    })
}

function handleJewelClicked() {
    if(state.gameLocked) { return }
    if(!state.move1.isActive) {
        this.firstChild.classList.add('jewel-active')
        state.move1.isActive = true
        state.move1.id = this.id
        return
    } else {
        if(this.id == state.move1.id) {
            this.firstChild.classList.remove('jewel-active')
            state.move1.isActive = false  
            state.move1.id = null    
        }
    }
    if(!state.move2.isActive) {
        let adjacentJewel = secondMoveAdjacent(this)
        if(adjacentJewel) {
            this.firstChild.classList.add('jewel-active')
            state.move2.isActive = true
            state.move2.id = this.id
            swapJewels(adjacentJewel)
            return
        } else {
            this.firstChild.classList.add('jewel-active')
            getJewelInViewById(state.move1.id).firstChild.classList.remove('jewel-active')
            state.move1.isActive = true
            state.move1.id = this.id
        }
    }
}

function secondMoveAdjacent(jewel) {
    let cnd = false
    let j1 = getJewelInModelBy('id', state.move1.id)
    let j2 = getJewelInModelBy('id', jewel.id)
    if((j2.x -1 == j1.x) && (j2.y == j1.y)) { cnd = 'left' }
    if((j2.x +1 == j1.x) && (j2.y == j1.y)) { cnd = 'right' }
    if((j2.x == j1.x) && (j2.y -1 == j1.y)) { cnd = 'above' }
    if((j2.x == j1.x) && (j2.y +1 == j1.y)) { cnd = 'below' }
    return cnd
}

function fillNoobs() {
    for(let i=0; i<8; i++) {
        let noobs = 0
        let col = []
        let coors = []
        state.nextModel.forEach(jewel => {
            if(jewel.x == i && jewel.color == null) {
                noobs++
                jewel.originalCoors = [jewel.x, -noobs]
                jewel.color = setColor()
                col.push(jewel)
                coors.push(jewel.originalCoors[1])
            }
        })
        coors.reverse()
        coors.forEach((coor, i) => {
            col[i].originalCoors[1] = coor
        })
    }
}

function scoreWinners() {
    let pieceTotal = 0
    state.scoringPieces.forEach(x => {
        let jewel = getJewelInModelBy('id', x)
        if(jewel.color == 7) {
            pieceTotal += 10
        } else if(jewel.color == 8) {
            pieceTotal += 100
        } else {
            pieceTotal++
        }
    })
    let x = pieceTotal * state.score.multiplier
    state.score.val += x
    score.innerHTML = formatCommas(state.score.val)
    if(state.score.val > state.highscore) {
        localStorage.setItem('highscore', state.score.val)
        state.highscore = state.score.val
        highscore.innerHTML = formatCommas(state.highscore)
    }
}

function runFullScore(dir) {
    state.gameLocked = true
    scoreWinners()
    createNextModel()
    shiftJewels(state.nextModel)
    fillNoobs()
    animateSwap(dir)
}

function swapJewels(dir) {
    if(moveValid()) {
        runFullScore(dir)
    } else {
        animateSwap(dir, true)
    }
}

function moveValid() {
    let j1, j2, x1, x2
    if(state.move1.id && state.move2.id) {
        j1 = getJewelInModelBy('id', state.move1.id)
        j2 = getJewelInModelBy('id', state.move2.id)
        x1 = j1.color
        x2 = j2.color
        j1.color = x2
        j2.color = x1
    }
        
    state.model.forEach(jewel => {
        check3InARow(jewel, 'left')
        check3InARow(jewel, 'right')
        check3InARow(jewel, 'above')
        check3InARow(jewel, 'below')
    })
    state.scoringPieces = state.scoringPieces.filter((c, index) => {
        return state.scoringPieces.indexOf(c) == index
    })
    const cnd = (state.scoringPieces.length >= 3) ? true : false
    if(cnd) { return cnd }
    if(state.move1.id && state.move2.id) {
        j1.color = x1
        j2.color = x2
    }
    return cnd
}

function check3InARow(jewel, dir) {
    let adjacent
    switch(dir) {
        case 'left':
            adjacent = getJewelInModelBy('coors', [jewel.x -1, jewel.y])
            if(adjacent) {
                if(jewel.color == adjacent.color) {
                    jewel.potentialScorer = true
                    adjacent.potentialScorer = true
                    check3InARow(adjacent, 'left')    
                } else { return }} break
        case 'right':
            adjacent = getJewelInModelBy('coors', [jewel.x +1, jewel.y])
            if(adjacent) {
                if(jewel.color == adjacent.color) {
                    jewel.potentialScorer = true
                    adjacent.potentialScorer = true
                    check3InARow(adjacent, 'right')    
                } else { return }} break
        case 'above':
            adjacent = getJewelInModelBy('coors', [jewel.x, jewel.y -1])
            if(adjacent) {
                if(jewel.color == adjacent.color) {
                    jewel.potentialScorer = true
                    adjacent.potentialScorer = true
                    check3InARow(adjacent, 'above')    
                } else { return }} break
        case 'below':
            adjacent = getJewelInModelBy('coors', [jewel.x, jewel.y +1])
            if(adjacent) {
                if(jewel.color == adjacent.color) {
                    jewel.potentialScorer = true
                    adjacent.potentialScorer = true
                    check3InARow(adjacent, 'below')    
                } else { return }} break
    }
    let potentialScorers = state.model.filter(jewel => {
        return jewel.potentialScorer
    })
    if(potentialScorers.length >= 3) {
        potentialScorers.forEach(scorer => {
            state.scoringPieces.push(scorer.id)
        })
    }
    state.model.forEach(jewel => {
        jewel.potentialScorer = false
    })
}

function startTimer() {
    console.log(state.time)
    const timer = setInterval(() => {
        state.time -= 10
        animateTimer()
        if(state.time <= 0) { stopTimer() }
    }, 250)
    function stopTimer() {
        clearInterval(timer)
    }

}