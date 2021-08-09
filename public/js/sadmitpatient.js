var form=document.querySelector('#admitForm')
var patientname=document.querySelector('#patientname')
var id=document.querySelector('#patientid')
var doctorname=document.querySelector('#doctorName')
var department=document.querySelector('#department')
var date=document.querySelector('#date')
var ward=document.querySelector('#ward')
var bed=document.querySelector('#bed')
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/admit/patient?token=${token}&name=${patientname.value}&patientId=${id.value}&doctorname=${doctorname.value}&date=${date.value}&department=${department.value}&patientWard=${ward.value}&patientBed=${bed.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                alert(data.Error)
            }else if(data.admit){
                alert('Patient Admitted!')
                location.href= `/admit?&token=${token}`
            }
        })
    })
})
function resetform(){
    form.reset()
}