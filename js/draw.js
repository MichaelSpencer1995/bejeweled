function drawModel(useNextModel) {
    console.log('draw')

    const model = useNextModel ? state.nextModel : state.model
    for(let i=0; i<8; i++) {
        const jewels = document.querySelectorAll(`.col-${i} .jewel-inner`)
        model.forEach(jewel => {
            let classes = [
                ['fas', 'fa-cannabis'],
                // ['fas', 'fa-cannabis'],
                ['fas', 'fa-carrot'],
                ['fas', 'fa-lemon'],
                ['fas', 'fa-bullseye'],
                ['fas', 'fa-bowling-ball'],
                ['fab', 'fa-evernote'],
                ['fas', 'fa-crow']
                // ['fab', 'fa-hornbill']
            ]
            let color
            if(jewel.color == 0) { color = [classes[0][0], classes[0][1]] }
            if(jewel.color == 1) { color = [classes[1][0], classes[1][1]] }
            if(jewel.color == 2) { color = [classes[2][0], classes[2][1]] }
            if(jewel.color == 3) { color = [classes[3][0], classes[3][1]] }
            if(jewel.color == 4) { color = [classes[4][0], classes[4][1]] }
            if(jewel.color == 5) { color = [classes[5][0], classes[5][1]] }
            if(jewel.color == 6) { color = [classes[6][0], classes[6][1]] }
            // its kinda dumb that this goes through every jewel when we only need the 8 in the column
            if(jewel.x == i) {
                jewels[jewel.y].firstChild.classList.remove('jewel-0', 'jewel-1', 'jewel-2', 'jewel-3', 'jewel-4', 'jewel-5', 'jewel-6', 'fas', 'fab', classes[0][1], classes[1][1], classes[2][1], classes[3][1], classes[4][1], classes[5][1], classes[6][1])
                jewels[jewel.y].firstChild.classList.add(`jewel-${jewel.color}`, color[0], color[1])
            }
            if(jewel.originalCoors && jewel.x == i) {
                jewels[jewel.y].classList.add('shifted')
                jewels[jewel.y].style.bottom = (jewel.y - jewel.originalCoors[1]) * 60 + 'px'
                console.log(jewel.id, jewel.y, jewel.originalCoors)
            }
        })
    }
}