const adminprofile=document.querySelector('#Profile')
const editadminName=document.querySelector('#editName')
const editadminEmail=document.querySelector('#editEmail')
const editadminPassword=document.querySelector('#editPassword')
const editadminAddress=document.querySelector('#editAddress')
const editadminPhoneNo=document.querySelector('#editPhoneNo')
const editadminNewPassword=document.querySelector('#editNewPassword')
const editadminConfirmPassword=document.querySelector('#editConfirmPassword')
var message=document.querySelector('#message')
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
adminprofile.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/admin/profile?token=${token}&name=${editadminName.value}&email=${editadminEmail.value}&oldpassword=${editadminPassword.value}&address=${editadminAddress.value}&phoneNumber=${editadminPhoneNo.value}&newpassword=${editadminNewPassword.value}&confirmpassword=${editadminConfirmPassword.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else if(data.admin){
                alert('Profile Updated')
                location.href=`/adminprofile?&token=${token}`
            }
        })
    })
})
