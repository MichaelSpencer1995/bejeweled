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
    let num = Math.floor(Math.random() * 7)
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
    console.log(state)
}