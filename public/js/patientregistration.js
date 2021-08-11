const registrationForm=document.querySelector('#registrationform')
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

var {token} = Qs.parse(location.search,{ ignoreQueryPrefix: true })
registrationForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/patient/registration?token=${token}&name=${patientname.value}&doctor=${doctor.value}&department=${department.value}&date=${date.value}&time=${time.value}&email=${email.value}&gender=${gender.value}&bloodGroup=${bloodGroup.value}&phoneNumber=${phoneNumber.value}&address=${address.value}&age=${age.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error   
            }
            else if(data.registration){
                alert('Patient Appointed!')
                location.href=`/dashboard/staff?&token=${token}`
            }
        })
    })
})




