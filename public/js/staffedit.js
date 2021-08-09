const editForm=document.querySelector('#staffedit')
const Password=document.querySelector('#Password')
const Address=document.querySelector('#Address')
const PhoneNo=document.querySelector('#PhoneNo')
const message=document.querySelector('#message')
var {id}=Qs.parse(location.search,{ignoreQueryPrefix:true})
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
editForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/staff/update?token=${token}&id=${id}&password=${Password.value}&address=${Address.value}&phoneNumber=${PhoneNo.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else if(data.doctor){
                location.href=`/staff/edit?token=${token}&id=${id}`
            }
        })
    })
})