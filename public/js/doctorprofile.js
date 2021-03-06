const profile=document.querySelector('#Profile')
const editName=document.querySelector('#editName')
const editEmail=document.querySelector('#editEmail')
const editPassword=document.querySelector('#editPassword')
const editAddress=document.querySelector('#editAddress')
const editPhoneNo=document.querySelector('#editPhoneNo')
const editaNewPassword=document.querySelector('#editNewPassword')
const editConfirmPassword=document.querySelector('#editConfirmPassword')
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
var message=document.querySelector('#message')
profile.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/profile?token=${token}&name=${editName.value}&email=${editEmail.value}&oldpassword=${editPassword.value}&address=${editAddress.value}&phoneNumber=${editPhoneNo.value}&newpassword=${editNewPassword.value}&confirmpassword=${editConfirmPassword.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else if(data.user){
                message.textContent=''
                alert('Profile Updated')
                location.href=`/doctorprofile?&token=${token}`
            }
        })
    })
})