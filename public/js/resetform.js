const form=document.querySelector('#resetForm')
const email=document.querySelector('#email')
const password=document.querySelector('#newPassword')
const confirmpassword=document.querySelector('#confirmPassword')
const message=document.querySelector('#message')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/updatePassword?email=${email.value}&password=${password.value}&confirmpassword=${confirmpassword.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else if(data.user){
                location.href='/'
            }
        })
    })
})