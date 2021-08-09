const form=document.querySelector('#resetForm')
const email=document.querySelector('#email')
const password=document.querySelector('#newPassword')
const confirmpassword=document.querySelector('#confirmPassword')

form.addEventListener('submit',(e)=>{
    fetch(`/updatePassword?email=${email.value}&password=${password.value}&confirmpassword=${confirmpassword.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                alert(data.Error)
            }else if(data.user){
                location.href='/'
            }
        })
    })
})