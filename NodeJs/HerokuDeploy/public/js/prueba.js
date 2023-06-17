let array = [
    [1,[3,4,5]],
    [2,[3,4,5]],
    [13,[3,4,5]],
    [14,[3,4,5]]
]

array.forEach(e=>{
    console.log(e)
    console.log(e[1].forEach(e2=>{
        console.log(e2)
    }))
})