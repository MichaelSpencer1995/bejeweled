function setColor(cur) {
    let vertical = []
    let horizontal = []
    if(cur) {
        state.model.forEach(jewel => {
            if(jewel.x == cur.x - 1 && jewel.y == cur.y) { horizontal.push(jewel) }
            if(jewel.x == cur.x - 2 && jewel.y == cur.y) { horizontal.push(jewel) }
            if(jewel.x == cur.x && jewel.y == cur.y - 1) { vertical.push(jewel) }
            if(jewel.x == cur.x && jewel.y == cur.y - 2) { vertical.push(jewel) }
        })
    }
    let exceptions = []
    if(vertical.length == 2) {
        if(vertical[0].color == vertical[1].color) { exceptions.push(vertical[0].color) }
    }
    if(horizontal.length == 2) {
        if(horizontal[0].color == horizontal[1].color) { exceptions.push(horizontal[0].color) }
    }
    return randomJewel(exceptions)
}

function randomJewel(except) {
    let colors = settings.dev && settings.maxColors ? settings.maxColors : 7
    let num = Math.floor(Math.random() * colors)
    return (num === except[0] || num === except[1]) ? randomJewel(except) : num
}
function getJewelInModelBy(type, data, useNextModel) {
    // console.log(type, data, useNextModel)
    // maybe this should not be a boolean but pass in model everytime?
    const xs = useNextModel ? state.nextModel : state.model
    return xs.filter(domEl => {
        if(type == 'id') {
            return (domEl.id == data)
        }
        if(type == 'coors') {
            return (domEl.x == data[0] && domEl.y == data[1])
        }
    })[0]
}

function getJewelInViewById(id) {
    return document.getElementById(`${id}`)
}

function modelsEqual() {
    let match = true
    state.model.forEach((x, i) => {
        let same = true
        if(x && state.nextModel[i]) {
            if(x.x != state.nextModel[i].x) { same = false }
            if(x.y != state.nextModel[i].y) { same = false }
            if(x.id != state.nextModel[i].id) { same = false }
            if(x.color != state.nextModel[i].color) { same = false }
        } else { same = false }
        if(!same) { match = false}
    })
    return match
}

function updateModels() {
    let nextModel = []
    state.nextModel.forEach(jewel => {
        curJew = Object.assign({}, jewel)
        nextModel.push(curJew)
    })
    state.model = nextModel
    state.nextModel = []
    state.move1.isActive = false
    state.move1.id = null
    state.move2.isActive = false
    state.move2.id = null
    state.scoringPieces = []
    state.jewelsDonePoofing = false
    state.swapBack = false
    state.endSwapping = false
    state.animateScoring = false
    const els = document.querySelectorAll('.jewel-inner')
    els.forEach(el => {
        el.classList.remove('transition-none', 'shifted')
        el.style = ''
    })
    state.model.forEach(jewel => {
        jewel.originalCoors = null
    })
    drawModel()
    if(moveValid()) {
        runFullScore()
    } else {
        state.gameLocked = false
    }
}

function formatCommas(x) {
    let num = (x + '').split('').reverse()
    let toFormat = []
    let formatted = ''
    if(num.length >= 4) {
        for(let i=0; i<num.length; i++) {
            if(i % 3 == 0 && i != 0) {
                toFormat.push(',')
                toFormat.push(num[i])
            } else {
                toFormat.push(num[i])
            }
        }
        toFormat = toFormat.reverse()
        for(let i=0; i<toFormat.length; i++) {
            formatted += toFormat[i]
        }

        return formatted
    }
    return x
}

console.log(formatCommas(1500000000))
console.log(formatCommas(999))
console.log(formatCommas(24242452525252525))
console.log(formatCommas(555555))
console.log(formatCommas(666666))
console.log(formatCommas(7777777777))