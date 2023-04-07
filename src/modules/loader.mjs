export let loader = ()=>{
    setTimeout(()=>{
        document.querySelector('.loader').classList.add('none')
    }, 1500)
}