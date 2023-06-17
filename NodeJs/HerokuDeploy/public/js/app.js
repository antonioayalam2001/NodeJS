// let button = document.getElementById('button')
//
// button.addEventListener('click',(e)=>{
//     alert(e.target)
//     alert(this)
//     if (e.target == button)
//         prompt('Diste click al boton')
// })

let array = [[1,[3,4,5]],
    [2,[3,4,5]],
    [13,[3,4,5]],
    [14,[3,4,5]]]

console.log(array.forEach(e=>{
    console.log(e)
    console.log(e[1].forEach(e2=>{
        console.log(e2)
    }))
}))
