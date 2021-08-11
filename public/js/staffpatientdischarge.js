var form=document.querySelector('#dischargeForm')
var patientname=document.querySelector('#PatientName')
var id=document.querySelector('#Patientid')
var doctorname=document.querySelector('#doctorname')
var department=document.querySelector('#Department')
var date=document.querySelector('#Date')
var ward=document.querySelector('#Ward')
var bed=document.querySelector('#Bed')
var days=document.querySelector('#days')
var charges=document.querySelector('#charges')
var message=document.querySelector('#message')
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/discharge/patient?token=${token}&name=${patientname.value}&patientId=${id.value}&doctorname=${doctorname.value}&date=${date.value}&department=${department.value}&patientWard=${ward.value}&patientBed=${bed.value}&bedDays=${days.value}&charges=${charges.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else if(data.discharge){
                message.textContent=''
                alert('Patient Discharged!')
                location.href=`/staff/discharge?&token=${token}&page=${0}`
            }
        })
    })
})
function resetForm(){
    form.reset()
}
var optionValues1 =[];
$('#doctorname option').each(function(){
   if($.inArray(this.value, optionValues1) >-1){
      $(this).remove()
   }else{
      optionValues1.push(this.value);
   }
})
var optionValues2 =[];
$('#Department option').each(function(){
   if($.inArray(this.value, optionValues2) >-1){
      $(this).remove()
   }else{
      optionValues2.push(this.value);
   }
});