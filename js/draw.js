function drawModel(useNextModel) {
    console.log('draw')

    const model = useNextModel ? state.nextModel : state.model
    for(let i=0; i<8; i++) {
        const jewels = document.querySelectorAll(`.col-${i} .jewel-inner`)
        model.forEach(jewel => {
            // its kinda dumb that this goes through every jewel when we only need the 8 in the column
            if(jewel.x == i) {
                jewels[jewel.y].classList.remove('jewel-0', 'jewel-1', 'jewel-2', 'jewel-3', 'jewel-4', 'jewel-5', 'jewel-6')
                jewels[jewel.y].classList.add(`jewel-${jewel.color}`)
                if(runDebug && settings.showIds) {
                    jewels[jewel.y].innerHTML = jewel.id
                }
            }
            if(jewel.originalCoors && jewel.x == i) {
                jewels[jewel.y].classList.add('shifted')
                jewels[jewel.y].style.bottom = (jewel.y - jewel.originalCoors[1]) * 60 + 'px'
                console.log(jewel.id, jewel.y, jewel.originalCoors)
            }
        })
    }
}