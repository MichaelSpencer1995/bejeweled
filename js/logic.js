function scoreWinners() { console.log('score these', state.scoringPieces) }

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

function swapJewels(dir) {
    if(moveValid()) {
        animateSwap(dir)
        scoreWinners()
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
    let j1 = getJewelInModelBy('Id', state.move1.id)
    let j2 = getJewelInModelBy('Id', state.move2.id)
    let x1 = j1.color
    let x2 = j2.color
    j1.color = x2
    j2.color = x1
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
    j1.color = x1
    j2.color = x2
    return cnd
}

function check3InARow(jewel, dir) {
    let adjacent
    switch(dir) {
        case 'left':
            adjacent = getJewelInModelBy('Coors', [jewel.x -1, jewel.y])
            if(adjacent) {
                if(jewel.color == adjacent.color) {
                    jewel.potentialScorer = true
                    adjacent.potentialScorer = true
                    check3InARow(adjacent, 'left')    
                } else { return }} break
        case 'right':
            adjacent = getJewelInModelBy('Coors', [jewel.x +1, jewel.y])
            if(adjacent) {
                if(jewel.color == adjacent.color) {
                    jewel.potentialScorer = true
                    adjacent.potentialScorer = true
                    check3InARow(adjacent, 'right')    
                } else { return }} break
        case 'above':
            adjacent = getJewelInModelBy('Coors', [jewel.x, jewel.y -1])
            if(adjacent) {
                if(jewel.color == adjacent.color) {
                    jewel.potentialScorer = true
                    adjacent.potentialScorer = true
                    check3InARow(adjacent, 'above')    
                } else { return }} break
        case 'below':
            adjacent = getJewelInModelBy('Coors', [jewel.x, jewel.y +1])
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