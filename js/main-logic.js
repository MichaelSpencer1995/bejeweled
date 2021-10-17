function handleJewelClicked() {
    if(!state.move1.isActive) {
        this.firstChild.classList.add('jewel-active')
        state.move1.isActive = true
        state.move1.id = this.id
        return
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
    let j1 = getJewelInModelBy('Id', state.move1.id)
    let j2 = getJewelInModelBy('Id', jewel.id)
    if((j2.x -1 == j1.x) && (j2.y == j1.y)) { cnd = 'left' }
    if((j2.x +1 == j1.x) && (j2.y == j1.y)) { cnd = 'right' }
    if((j2.x == j1.x) && (j2.y -1 == j1.y)) { cnd = 'above' }
    if((j2.x == j1.x) && (j2.y +1 == j1.y)) { cnd = 'below' }
    return cnd
}


function moveValid() {
    // cnd false
    // create new model with pieces swapped,
    // run scan to check every single pieces to see if there
    // is a single 3 in a row
    // return cnd true
}

function swapJewels(dir) {
    if(moveValid()) {
        animateSwap(dir)
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

function moveValid() {
    // we need a function that takes jewel and a to comare to direction, and returns the corresponding jewel in the DOM/view
    let j1 = getJewelInModelBy('Id', state.move1.id)
    let j2 = getJewelInModelBy('Id', state.move2.id)
    let x1 = j1.color
    let x2 = j2.color
    j1.color = x2
    j2.color = x1
    
    console.log('before', j1.color, j2.color)
    

    state.model.forEach(jewel => {
        check3InARow(jewel, 'left')
        check3InARow(jewel, 'right')
        check3InARow(jewel, 'above')
        check3InARow(jewel, 'below')
    })
    state.scoringPieces = state.scoringPieces.filter((c, index) => {
        return state.scoringPieces.indexOf(c) == index
    })
    console.log(state.scoringPieces)

    const cnd = (state.scoringPieces.length >= 3) ? true : false
    if(cnd) { return cnd }
    j1.color = x1
    j2.color = x2

    console.log('after', j1.color, j2.color)
    return cnd
}

function check3InARow(jewel, dir) {
    checkAdjMatch(jewel, dir)
}

function checkAdjMatch(jewel, dir) {
    let adjacent
    switch(dir) {
        case 'left':
            adjacent = getJewelInModelBy('Coors', [jewel.x -1, jewel.y])
            if(adjacent) {
                if(jewel.color == adjacent.color) {
                    jewel.potentialScorer = true
                    adjacent.potentialScorer = true
                    checkAdjMatch(adjacent, 'left')    
                } else {return}
            }
        break
        case 'right':
            adjacent = getJewelInModelBy('Coors', [jewel.x +1, jewel.y])
            if(adjacent) {
                if(jewel.color == adjacent.color) {
                    jewel.potentialScorer = true
                    adjacent.potentialScorer = true
                    checkAdjMatch(adjacent, 'right')    
                } else {return}
            }
        break
        case 'above':
            adjacent = getJewelInModelBy('Coors', [jewel.x, jewel.y -1])
            if(adjacent) {
                if(jewel.color == adjacent.color) {
                    jewel.potentialScorer = true
                    adjacent.potentialScorer = true
                    checkAdjMatch(adjacent, 'above')    
                } else {return}
            }
        break
        case 'below':
            adjacent = getJewelInModelBy('Coors', [jewel.x, jewel.y +1])
            if(adjacent) {
                if(jewel.color == adjacent.color) {
                    jewel.potentialScorer = true
                    adjacent.potentialScorer = true
                    checkAdjMatch(adjacent, 'below')    
                } else {return}
            }
        break
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

function animateSwap(dir, swapBack) {
    let j1 = getJewelInViewById(state.move1.id).firstChild
    let j2 = getJewelInViewById(state.move2.id).firstChild

    if(dir == 'left') {
        j2.classList.add('swap-left')
        j1.classList.add('swap-right')
    }
    if(dir == 'right') {
        j2.classList.add('swap-right')
        j1.classList.add('swap-left')
    }
    if(dir == 'above') {
        j2.classList.add('swap-up')
        j1.classList.add('swap-down')
    }
    if(dir == 'below') {
        j2.classList.add('swap-down')
        j1.classList.add('swap-up')
    }
    if(swapBack) {
        state.swapBack = true
    }
}

function animateSwapBack() {
    state.swapBack = false
    state.endSwapping = true
    let j1 = getJewelInViewById(state.move1.id).firstChild
    let j2 = getJewelInViewById(state.move2.id).firstChild
    j1.classList.remove('swap-left', 'swap-right', 'swap-up', 'swap-down', 'jewel-active')
    j2.classList.remove('swap-left', 'swap-right', 'swap-up', 'swap-down', 'jewel-active')
}

function handleAnimationEnded(event) {
    if (event.propertyName == 'transform') {
        if(state.endSwapping && event.srcElement.parentElement.id == state.move2.id) {
            state.move1.isActive = false
            state.move2.isActive = false
            state.move1.id = null
            state.move2.id = null
            state.endSwapping = false
        }
        if(state.swapBack && event.srcElement.parentElement.id == state.move2.id) {
            animateSwapBack()
        }
    }
}