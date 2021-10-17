function drawModel() {
    for(let i=0; i<8; i++) {
        const jewels = document.querySelectorAll(`.col-${i} .jewel-inner`)
        state.model.forEach(jewel => {
            if(jewel.x == i) {
                jewels[jewel.y].classList.add(`jewel-${jewel.color}`)
                jewels[jewel.y].innerHTML = jewel.id
            }
        })
    }
}