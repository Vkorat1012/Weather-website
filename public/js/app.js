

// const p1= document.querySelector('#p1')
// console.log(p1.innerHTML)


//window.onload = ()=> { 

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

   const loc = search.value

   
   messageOne.textContent = 'Loading...'
   messageTwo.textContent = ''

    fetch('/weather?address='+ loc).then((response)=>{
    response.json().then((data) =>
    {
        if(data.error)
        {
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})




})
//}