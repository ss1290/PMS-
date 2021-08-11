const staffForm=document.querySelector('#StaffForm')
const staffName=document.querySelector('#staffName')
const staffEmail=document.querySelector('#staffEmail')
const staffPassword=document.querySelector('#staffPassword')
const staffAddress=document.querySelector('#staffAddress')
const staffPhoneNo=document.querySelector('#staffPhoneNo')
var message=document.querySelector('#message')
staffForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/signup/staff?token=${token}&name=${staffName.value}&email=${staffEmail.value}&password=${staffPassword.value}&address=${staffAddress.value}&phoneNumber=${staffPhoneNo.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else{
                message.textContent=''
                alert('Staff Added!')
                location.href=`/admin/staff?&token=${token}&page=${0}`
            }
        })
    })
})