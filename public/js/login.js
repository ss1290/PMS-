const loginForm=document.querySelector('#login-form')
const Email=document.querySelector('#email')
const Password=document.querySelector('#password')
const message=document.querySelector('#message1')
const togglePassword=document.querySelector('#toggle-password')
togglePassword.addEventListener('click',(e)=>{
    const type=Password.getAttribute('type')=== "password" ? "text" : "password";
    Password.setAttribute("type",type)
    togglePassword.classList.toggle('fa-eye-slash')
})
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email=Email.value
    const password=Password.value
    fetch('/login?email='+email+'&password='+password).then((response)=>{
        response.json().then((data)=>{
            if(data.role==='admin'){
                location.href=`/dashboard/admin?&token=${data.token}`
            }else if(data.role==='doctor'){
                location.href=`/dashboard/doctor?&token=${data.token}`
            }else if(data.role==='staff'){
                location.href=`/dashboard/staff?&token=${data.token}`
            }else if(data.Error){
                message.textContent=data.Error
            }
        })
    })
})