function animatePoof() {
    document.querySelectorAll('.jewel-inner').forEach(jewel => {
        jewel.classList.add('transition-none')
        jewel.classList.remove('swap-left', 'swap-right', 'swap-up', 'swap-down', 'jewel-active')
    })
    drawModel()
    state.scoringPieces.forEach(id => {
        setTimeout(() => {
            const scorer = getJewelInViewById(id)
            scorer.firstChild.classList.remove('transition-none')
            // its like the swap classed are still on when this class is added
            // so there should be away to do this without set timeout
            // we need to learn why this is happening
            scorer.firstChild.classList.add('jewel-poof')
            state.jewelsPoofing = true
        }, 0.2)
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
        if(state.jewelsPoofing) {
            state.jewelsPoofing = false
            document.querySelectorAll('.jewel-poof').forEach(el => {
                el.classList.remove('jewel-poof')
                el.classList.add('transition-none')
            })
            drawModel(true)
        }
        if(state.animateScoring) {
            animatePoof()
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