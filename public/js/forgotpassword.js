const email=document.querySelector('#Email')
const form=document.querySelector('#passwordResetForm')
const message=document.querySelector('#message')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/forgot?email=${email.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else if(data.user){
                message.textContent=""
                location.href=`/success?email=${email.value}`
            }
        })
    })
})
