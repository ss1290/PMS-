var Form=document.querySelector('#DoctorForm')
var Name=document.querySelector('#Name')
var Email=document.querySelector('#Email')
var Password=document.querySelector('#Password')
var Address=document.querySelector('#Address')
var PhoneNo=document.querySelector('#PhoneNo')
var Department=document.querySelector('#Department')
var TimeTo=document.querySelector('#TimeTo')
var ConsultancyFee=document.querySelector('#ConsultancyFee')
var ConsultancyDay=document.querySelector('#ConsultancyDay')
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
var message=document.querySelector('#message')
Form.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/signup/doctor?token=${token}&name=${Name.value}&email=${Email.value}&password=${Password.value}&address=${Address.value}&phoneNumber=${PhoneNo.value}&department=${Department.value}&timeFrom=${TimeFrom.value}&timeTo=${TimeTo.value}&consultancyFee=${ConsultancyFee.value}&consultancyDay=${ConsultancyDay.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                message.textContent=data.Error
            }else{
                message.textContent=''
                alert('Doctor Added!')
                location.href=`/admin/doctor?&token=${token}&page=${0}`
            }
        })
    })
})