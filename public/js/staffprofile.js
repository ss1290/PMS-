const staffprofile=document.querySelector('#staffProfile')
const editName=document.querySelector('#editstaffName')
const editEmail=document.querySelector('#editstaffEmail')
const editPassword=document.querySelector('#editstaffPassword')
const editAddress=document.querySelector('#editstaffAddress')
const editPhoneNo=document.querySelector('#editstaffPhoneNo')
const editNewPassword=document.querySelector('#editstaffNewPassword')
const editConfirmPassword=document.querySelector('#editstaffConfirmPassword')
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
staffprofile.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/staff/profile?token=${token}&name=${editName.value}&email=${editEmail.value}&oldpassword=${editPassword.value}&address=${editAddress.value}&phoneNumber=${editPhoneNo.value}&newpassword=${editNewPassword.value}&confirmpassword=${editConfirmPassword.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                alert(data.Error)
            }else if(data.staff){
                alert('Profile Updated')
                location.href=`/staffprofile?&token=${token}`
            }
        })
    })
})
