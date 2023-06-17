const container = document.querySelector('.container')
const containerLoader = document.querySelector('.containerLoader')
window.addEventListener('load',()=>{
        const timeOut = setTimeout(() => {
            console.log('Pasaron 2 segundos');
            containerLoader.classList.add('hidden')
            container.classList.remove('hidden')

        }, 3000); //Tiempo en milisegundos
}
)