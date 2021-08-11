const appointmentForm=document.querySelector('#appointmentform')
const id=document.querySelector('#patientId')
var patientname=document.querySelector('#name')
var doctor=document.querySelector('#doctor')
var department=document.querySelector('#department')
var date=document.querySelector('#date')
var time=document.querySelector('#time')
var message=document.querySelector('#message')
const email=document.querySelector('#email')
const gender=document.querySelector('#gender')
const bloodGroup=document.querySelector('#bloodGroup')
const phoneNumber=document.querySelector('#phoneNumber')
const address=document.querySelector('#address')
const age=document.querySelector('#age')
var {token} = Qs.parse(location.search, { ignoreQueryPrefix: true })

appointmentForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/patient/appointment?token=${token}&name=${patientname.value}&doctor=${doctor.value}&department=${department.value}&date=${date.value}&time=${time.value}&email=${email.value}&gender=${gender.value}&bloodGroup=${bloodGroup.value}&phoneNumber=${phoneNumber.value}&address=${address.value}&age=${age.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error   
            }
            else if(data.appointment){
                alert('Patient Appointed!')
                location.href=`/dashboard/staff?&token=${token}`
            }
        })
    })
})
id.addEventListener('change',(e)=>{
    fetch(`/patient/id?token=${token}&patientId=${id.value}`).then((response)=>{
        response.json().then((data)=>{
            patientname.value = data.patient.name
            email.value=data.patient.email
            phoneNumber.value=data.patient.phoneNumber
            address.value=data.patient.address
            gender.value=data.patient.gender
            age.value=data.patient.age
            bloodGroup.value=data.patient.bloodGroup
        })
    })
})