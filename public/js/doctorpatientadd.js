const patientForm=document.querySelector('#PatientForm')
const patientName=document.querySelector('#patientName')
const patientId=document.querySelector('#patientId')
const patientEmail=document.querySelector('#patientEmail')
const patientAddress=document.querySelector('#patientAddress')
const patientPhoneNo=document.querySelector('#patientPhoneNo')
const patientAge=document.querySelector('#age')
const gender=document.querySelector('#gender')
const bloodGroup=document.querySelector('#bloodGroup')
const birthDate=document.querySelector('#birthDate')
var message=document.querySelector('#message')
patientForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/add/patient?token=${token}&name=${patientName.value}&patientId=${patientId.value}&email=${patientEmail.value}&address=${patientAddress.value}&phoneNumber=${patientPhoneNo.value}&age=${patientAge.value}&gender=${gender.value}&birthDate=${birthDate.value}&bloodGroup=${bloodGroup.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error   
            }
            else if(data.patient){
                message.textContent=''
                alert('Patient Added!')
                location.href=`/doctor/patient?&token=${token}&page=${0}`
            }
        })
    })
})
