const doctoreditForm=document.querySelector('#doctoredit')
const Password=document.querySelector('#Password')
const Address=document.querySelector('#Address')
const PhoneNo=document.querySelector('#PhoneNo')
const Department=document.querySelector('#Department')
const TimeFrom=document.querySelector('#TimeFrom')
const TimeTo=document.querySelector('#TimeTo')
const ConsultancyFee=document.querySelector('#ConsultancyFee')
const ConsultancyDay=document.querySelector('#ConsultancyDay')
const message=document.querySelector('#message')
var {id}=Qs.parse(location.search,{ignoreQueryPrefix:true})
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
doctoreditForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/doctor/update?token=${token}&id=${id}&password=${Password.value}&address=${Address.value}&phoneNumber=${PhoneNo.value}&department=${Department.value}&timeFrom=${TimeFrom.value}&timeTo=${TimeTo.value}&consultancyFee=${ConsultancyFee.value}&consultancyDay=${ConsultancyDay.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else if(data.doctor){
                location.href=`/doctor/edit?token=${token}&id=${id}`
            }
        })
    })
})
