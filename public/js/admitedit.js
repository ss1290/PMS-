var form=document.querySelector('#admitedit')
var patientname=document.querySelector('#patientname')
var patientid=document.querySelector('#patientid')
var doctorname=document.querySelector('#doctorName')
var department=document.querySelector('#department')
var date=document.querySelector('#date')
var ward=document.querySelector('#ward')
var bed=document.querySelector('#bed')
var message=document.querySelector('#message')
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
var {id}=Qs.parse(location.search,{ignoreQueryPrefix:true})
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/admit/update?token=${token}&id=${id}&name=${patientname.value}&patientId=${patientid.value}&doctorname=${doctorname.value}&date=${date.value}&department=${department.value}&patientWard=${ward.value}&patientBed=${bed.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else if(data.admit){
                message.textContent=''
                alert('Admit edited!')
                location.href=`/admit/edit?token=${token}&id=${id}`
            }
        })
    })
})