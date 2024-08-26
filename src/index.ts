import './index.scss'
const h1 = document.querySelector('h1')!
const click = document.querySelector('.click')! as HTMLDivElement
console.log(click);

function local():number{
    const getting = localStorage.getItem('count')
    if(getting){
        const parsed:number = JSON.parse(getting)
        if(parsed && typeof parsed === 'number'){
            return parsed
        }
    }
    return 0
}
click.addEventListener('click', (e)=>{
    e.preventDefault()
    let count:number = local()
    h1.innerHTML = count.toString()
    count++
    localStorage.setItem('count', JSON.stringify(count))
})
window.addEventListener('DOMContentLoaded', ()=>{
    let count:number = local()
    h1.innerHTML = JSON.stringify(count)
})