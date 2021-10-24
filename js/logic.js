// function scoreWinners() { console.log('score these', state.scoringPieces) }

function shiftJewels(model) {
    console.log('shift jewels')
    model.forEach(jewel => {
        shiftJewel(jewel)
    })
    for(let i=0; i<8; i++) {
        let col = model.filter(j => j.x == i).reverse()
        let nullFound = false
        col.forEach(j => {
            if(j.color == null) {
                nullFound = true
                // return
            }
            if(j.color && nullFound) {
                // starting from bottom to top of each column.. if a empty spot is found AND the next jewel above it
                // has a color... that means all the jewels have NOT made their way to the bottom of the game board
                // so shiftJewels needs to run on all the jewels again until (when starting from the bottom up of
                // each column) every jewel that is null (empty ie recently scored) has nothing but other empty's
                // above it.. meaning there are no floating jewels
                shiftJewels(model)
            }
        })
    }
}

function shiftJewel(jewel) {
    const jewelBelow = getJewelInModelBy('coors', [jewel.x, jewel.y + 1], true)
    if(jewelBelow) {
        if(jewelBelow.color == null) {
            if(!jewel.originalCoors) {
                // on horizontal everthing moves once.. on vertical, when it goes to move again its gonna have
                // some originalCoors already, so if it gets original coors once it can move but it cant change
                // its original coors so the coors would have to get swapped with the color right?
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
    }
    if(!state.move2.isActive) {
        let adjacentJewel = secondMoveAdjacent(this)
        console.log(adjacentJewel)
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
    console.log(state.move1, state.move2)
    let j1 = getJewelInModelBy('id', state.move1.id)
    let j2 = getJewelInModelBy('id', jewel.id)
    console.log(j1, j2, state)
    if((j2.x -1 == j1.x) && (j2.y == j1.y)) { cnd = 'left' }
    if((j2.x +1 == j1.x) && (j2.y == j1.y)) { cnd = 'right' }
    if((j2.x == j1.x) && (j2.y -1 == j1.y)) { cnd = 'above' }
    if((j2.x == j1.x) && (j2.y +1 == j1.y)) { cnd = 'below' }
    return cnd
}

function fillNoobs() {
    for(let i=0; i<8; i++) {
        // same here going through each instead of just 8
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

function runFullScore(dir) {
    state.gameLocked = true
    createNextModel()
    shiftJewels(state.nextModel)
    fillNoobs()
    animateSwap(dir)
}

function swapJewels(dir) {
    if(moveValid()) {
        // scoreWinners()
        // createNextModel()
        runFullScore(dir)
        // animateSwap(dir)
        
        // genrate new model
            // swap pieces in model
            // find all deleteable pieces
            // delete them/update score
            // move all pieces down into open spaces
            // generate new random color values in the new empty jewel spots
        // animate
            // perhaps the entire new dom needs to be created immidiatly
            // all the pieces pre shifted, and then the animate class needs to be added

            // swap original two pieces in model
            // all deletable pieces (usually just the 3 connected recently formed)
            // flash disappear of all pieces( transition fade away but keep in dom)
            // all jewels above empty pieces need to transition down however many
            // pixels tall got deleted (3 vertical 180px), (3 horizontal 60px etc)
            
    } else {
        animateSwap(dir, true)
        // state.move1.isActive = false
        // state.move2.isActive = false
        // state.move1.id = null
        // state.move2.id = null
        // animate swap and return
        // unlock game/reset jewel pieces in state isActive to
    }
}


// maybe should be called scored() instead of moveValid()
function moveValid() {
    if(state.move1.id && state.move2.id) {
        let j1 = getJewelInModelBy('id', state.move1.id)
        let j2 = getJewelInModelBy('id', state.move2.id)
        let x1 = j1.color
        let x2 = j2.color
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