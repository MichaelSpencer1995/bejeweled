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
    let j1 = getJewelInModelById(state.move1.id)
    let j2 = getJewelInModelById(jewel.id)
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
    return false
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