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
        }
    }
}

function secondMoveAdjacent(jewel) {
    let cnd = false
    let j1 = findJewelInModelById(state.move1.id)
    let j2 = findJewelInModelById(jewel.id)
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
        animateSwap(dir)
        // animate swap and return
        // unlock game/reset jewel pieces in state isActive to
    }
}

function moveValid() {
    return false
}

function animateSwap(dir) {
    state.jewelsSwapping = true
    let j1 = findJewelInViewById(state.move1.id).firstChild
    let j2 = findJewelInViewById(state.move2.id).firstChild

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
}

function animateSwapBack() {
    let j1 = findJewelInViewById(state.move1.id).firstChild
    let j2 = findJewelInViewById(state.move2.id).firstChild
    j1.classList.remove('swap-left')
    j1.classList.remove('swap-right')
    j1.classList.remove('swap-up')
    j1.classList.remove('swap-down')
    j2.classList.remove('swap-left')
    j2.classList.remove('swap-right')
    j2.classList.remove('swap-up')
    j2.classList.remove('swap-down')
}

function handleAnimationEnded(event) {
    if (event.propertyName == 'transform') {
        console.log('testt')
        if(state.jewelsSwapping) {
            console.log('testsdsfsft')
            animateSwapBack()
        }
    }
}