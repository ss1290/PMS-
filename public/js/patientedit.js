const editForm=document.querySelector('#patientedit')
const Address=document.querySelector('#Address')
const PhoneNo=document.querySelector('#PhoneNo')
const patientId=document.querySelector('#id')
const age=document.querySelector('#age')
const gender=document.querySelector('#gender')
const bloodGroup=document.querySelector('#bloodGroup')
const birthDate=document.querySelector('#birthDate')
const message=document.querySelector('#message')
var {id}=Qs.parse(location.search,{ignoreQueryPrefix:true})
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
editForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/patient/update?token=${token}&id=${id}&patientId=${patientId.value}&address=${Address.value}&phoneNumber=${PhoneNo.value}&age=${age.value}&gender=${gender.value}&birthDate=${birthDate.value}&bloodGroup=${bloodGroup.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else if(data.patient){
                message.textContent=''
                alert('patient edited')
                location.href=`/patient/edit?token=${token}&id=${id}`
            }
        })
    })
})