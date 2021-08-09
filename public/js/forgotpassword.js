const email=document.querySelector('#Email')
const form=document.querySelector('#passwordResetForm')
const successMessage=document.querySelector('#successMessage')

form.addEventListener('submit',(e)=>{
    fetch(`/forgot?email=${email.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                alert(data.Error)
            }else if(data.user){
                location.href=`/success?email=${email.value}`
            }
        })
    })
})
