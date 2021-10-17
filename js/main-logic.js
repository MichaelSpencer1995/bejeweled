function handleJewelClicked() {
    if(!state.move1.isActive) {
        this.firstChild.classList.add('jewel-active')
        state.move1.isActive = true
        state.move1.id = this.id
        return
    }
    if(!state.move2.isActive) {
        if(secondMoveAdjacent(this)) {
            this.firstChild.classList.add('jewel-active')
            state.move2.isActive = true
            swapJewels()
            return
        }
    }
}

function secondMoveAdjacent(jewel) {
    let cnd = false
    let j1 = findJewelInModelById(state.move1.id)
    let j2 = findJewelInModelById(jewel.id)
    if((j2.x -1 == j1.x) && (j2.y == j1.y)) { cnd = true }
    if((j2.x +1 == j1.x) && (j2.y == j1.y)) { cnd = true }
    if((j2.x == j1.x) && (j2.y -1 == j1.y)) { cnd = true }
    if((j2.x == j1.x) && (j2.y +1 == j1.y)) { cnd = true }
    return cnd
}