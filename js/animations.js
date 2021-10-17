function animateScoring() {
    let winners = state.scoringPieces.forEach(id => {
        document.querySelectorAll('.jewel-inner').forEach(jewel => {
            jewel.classList.remove('swap-left', 'swap-right', 'swap-up', 'swap-down')
            jewel.classList.add('transition-none')
        })
        drawModel()
        getJewelInViewById(id).firstChild.classList.add('jewel-poof')
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
    if(state.scoringPieces.length > 0) {
        state.animateScoring = true
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
        if(state.animateScoring) {
            animateScoring()
            state.animateScoring = false
        }
        if(state.endSwapping && event.srcElement.parentElement.id == state.move2.id) {
            state.move1.isActive = false
            state.move2.isActive = false
            state.move1.id = null
            state.move2.id = null
            state.endSwapping = false
            console.log('scoring pieces', state.scoringPieces)
   
        }
        if(state.swapBack && event.srcElement.parentElement.id == state.move2.id) {
            animateSwapBack()
            console.log(state.scoringPieces)
        }
    }
}