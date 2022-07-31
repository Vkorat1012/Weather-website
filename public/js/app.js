

const p1= document.querySelector('#p1')
console.log(p1.innerHTML)


//window.onload = ()=> { 

const weatherform = document.querySelector('form')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const search = document.querySelector('input')
   const loc = search.value
    fetch('http://localhost:3000/weather?address='+ loc).then((response)=>{
    response.json().then((data) =>
    {
        if(data.error)
        {
            console.log(data.error)
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})




})
//}