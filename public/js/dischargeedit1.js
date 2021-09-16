var form=document.querySelector('#dischargeedit')
var patientname=document.querySelector('#PatientName')
var patientid=document.querySelector('#Patientid')
var doctorname=document.querySelector('#doctorname')
var department=document.querySelector('#Department')
var date=document.querySelector('#Date')
var ward=document.querySelector('#Ward')
var bed=document.querySelector('#Bed')
var days=document.querySelector('#days')
var charges=document.querySelector('#charges')
var message=document.querySelector('#message')
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
var {id}=Qs.parse(location.search,{ignoreQueryPrefix:true})
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/discharge/update?token=${token}&id=${id}&name=${patientname.value}&patientId=${patientid.value}&doctorname=${doctorname.value}&date=${date.value}&department=${department.value}&patientWard=${ward.value}&patientBed=${bed.value}&bedDays=${days.value}&charges=${charges.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else if(data.discharge){
                message.textContent=''
                alert('Discharge edited!')
                location.href=`/discharge1/edit?&token=${token}&id=${id}`
            }
        })
    })
})