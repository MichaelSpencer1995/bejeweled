function animatePoof() {
    if(!state.mute) { sounds.score.play() }
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
            state.jewelsDonePoofing = true
        }, 0.2)
    })
}

function animateSwap(dir, swapBack) {
    if(!dir) {
        animatePoof()
        return
    }
    if(!state.mute) { sounds.swap.play() }

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
    } else {
        state.animateScoring = true
    }
}

function animateSwapBack() {
    if(!state.mute) { sounds.swap.play() }
    state.swapBack = false
    state.endSwapping = true
    let j1 = getJewelInViewById(state.move1.id).firstChild
    let j2 = getJewelInViewById(state.move2.id).firstChild
    j1.classList.remove('swap-left', 'swap-right', 'swap-up', 'swap-down', 'jewel-active')
    j2.classList.remove('swap-left', 'swap-right', 'swap-up', 'swap-down', 'jewel-active')
}

function handleAnimationEnded(event) {
    if(event.propertyName == 'transform') {
        // make these make more sense and call function with same name
        if(state.jewelsDonePoofing) {
            if(!state.mute) { sounds.swoop.play() }
            state.jewelsDonePoofing = false
            document.querySelectorAll('.jewel-poof').forEach(el => {
                el.classList.remove('jewel-poof')
                el.classList.add('transition-none')
            })

            drawModel(true)
            const els = document.querySelectorAll('.shifted')
            const animationClock = setInterval(() => {
                for(let i=0; i<els.length; i++) {
                    if(els[i].style.bottom == '0px') {
                        let finished = true
                        els.forEach(el => {
                            if(el.style.bottom != '0px') {
                                finished = false
                            }
                        })
                        if(finished) {
                            stopAnimation()
                            updateModels()
                            break
                        }
                    } else {
                        let num = parseInt(els[i].style.bottom)
                        num -= settings.gravity.distance
                        els[i].style.bottom = num + 'px'
                    }
                }
            }, settings.gravity.speed)
            function stopAnimation() {
                clearInterval(animationClock)
            }
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
   
        }
        if(state.swapBack && event.srcElement.parentElement.id == state.move2.id) {
            animateSwapBack()
        }
    }
}

function animateTimer() {
    timer.firstChild.style.width = state.time + '%'
}