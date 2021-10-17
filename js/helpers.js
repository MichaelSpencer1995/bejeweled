function setColor(cur) {
    let vertical = []
    let horizontal = []
    state.model.forEach(jewel => {
        if(jewel.x == cur.x - 1 && jewel.y == cur.y) {
            horizontal.push(jewel)
        }
        if(jewel.x == cur.x - 2 && jewel.y == cur.y) {
            horizontal.push(jewel)
        }
        if(jewel.x == cur.x && jewel.y == cur.y - 1) {
            vertical.push(jewel)
        }
        if(jewel.x == cur.x && jewel.y == cur.y - 2) {
            vertical.push(jewel)
        }
    })
    let exceptions = []
    if(vertical.length == 2) {
        if(vertical[0].color == vertical[1].color) {
            exceptions.push(vertical[0].color)  
        }
    }
    if(horizontal.length == 2) {
        if(horizontal[0].color == horizontal[1].color) {
            exceptions.push(horizontal[0].color)
        }
    }
    return randomJewel(exceptions)
}

function randomJewel(except) {
    let num = Math.floor(Math.random() * 7)
    return (num === except[0] || num === except[1]) ? randomJewel(except) : num
}

function findJewelInModelById(id) {
    return (state.model.filter(domEl => {
        return (domEl.id == id)
    }))[0]
}

function findJewelInViewById(id) {
    return document.getElementById(`${id}`)
}
