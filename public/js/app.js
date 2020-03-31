<!--Client Side javascript-->
console.log('Client Side javascript Is Loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit',(e)=>{  <!--e = event -->
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error  //if error
            }else{
               messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})