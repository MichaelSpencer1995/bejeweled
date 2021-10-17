function drawModel() {
    for(let i=0; i<8; i++) {
        const jewels = document.querySelectorAll(`.col-${i} .jewel-inner`)
        state.model.forEach(jewel => {
            if(jewel.x == i) {
                jewels[jewel.y].classList.remove('jewel-0', 'jewel-1', 'jewel-2', 'jewel-3', 'jewel-4', 'jewel-5', 'jewel-6')
                jewels[jewel.y].classList.add(`jewel-${jewel.color}`)
                // jewels[jewel.y].innerHTML = jewel.id
            }
        })
    }
}