const validator =require('validator')
const patientValidate=(validate)=>{
    if(!validator.isAlpha(validate.name,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid name')
    }
    if(!validator.isNumeric(validate.patientId)){
        throw new Error('Please enter a valid patient ID')
    }
    if(!validator.isEmail(validate.email)){
        throw new Error('Please enter a valid email')
    }
    if(!validator.isAlphanumeric(validate.address,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid address')
    }
    if(!validator.isNumeric(validate.phoneNumber)){
        throw new Error('Please enter a valid phone number')
    }
    if(validate.phoneNumber.length<10){
        throw new Error('Please enter a phone number of atleast 10 digit')
    }
    if(!validator.isNumeric(validate.age)){
        throw new Error('Please enter a valid age')
    }
}
const patienteditValidate=(validate)=>{
    if(!validator.isNumeric(validate.patientId)){
        throw new Error('Please enter a valid patient ID')
    }
    if(!validator.isAlphanumeric(validate.address,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid address')
    }
    if(!validator.isNumeric(validate.phoneNumber)){
        throw new Error('Please enter a valid phone number')
    }
    if(validate.phoneNumber.length<10){
        throw new Error('Please enter a phone number of atleast 10 digit')
    }
    if(!validator.isNumeric(validate.age)){
        throw new Error('Please enter a valid age')
    }
}
const doctorValidate=(validate)=>{
    if(!validator.isAlpha(validate.name,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid name')
    }
    if(!validator.isEmail(validate.email)){
        throw new Error('Please enter a valid email')
    }
    if(!validator.isStrongPassword(validate.password,{minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1})) 
    {
        throw new Error('Please enter a valid password')
    }
    if(!validator.isAlphanumeric(validate.address,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid address')
    }
    if(!validator.isNumeric(validate.phoneNumber)){
        throw new Error('Please enter a valid phone number')
    }
    if(validate.phoneNumber.length<10){
        throw new Error('Please enter a phone number of atleast 10 digit')
    }
    if(!validator.isAlpha(validate.department,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid department')
    }
    if(!validator.isNumeric(validate.timeFrom)){
        throw new Error('Please enter a valid time from')
    }
    if(!validator.isNumeric(validate.timeTo)){
        throw new Error('Please enter a valid time to')
    }
    if(!validator.isNumeric(validate.consultancyFee)){
        throw new Error('Please enter a valid consultancy fee')
    }
    if(!validator.isAlpha(validate.consultancyDay,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid consultancy day')
    }
}
const doctoreditValidate=(validate)=>{
    if(!validator.isStrongPassword(validate.password,{minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1})) 
    {
        throw new Error('Please enter a valid password')
    }
    if(!validator.isAlphanumeric(validate.address,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid address')
    }
    if(!validator.isNumeric(validate.phoneNumber)){
        throw new Error('Please enter a valid phone number')
    }
    if(validate.phoneNumber.length<10){
        throw new Error('Please enter a phone number of atleast 10 digit')
    }
    if(!validator.isAlpha(validate.department,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid department')
    }
    if(!validator.isNumeric(validate.timeFrom)){
        throw new Error('Please enter a valid time from')
    }
    if(!validator.isNumeric(validate.timeTo)){
        throw new Error('Please enter a valid time to')
    }
    if(!validator.isNumeric(validate.consultancyFee)){
        throw new Error('Please enter a valid consultancy fee')
    }
    if(!validator.isAlpha(validate.consultancyDay,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid consultancy day')
    }
}
const staffValidate=(validate)=>{
    if(!validator.isAlpha(validate.name,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid name')
    }
    if(!validator.isEmail(validate.email)){
        throw new Error('Please enter a valid email')
    }
    if(!validator.isStrongPassword(validate.password,{minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1})) 
    {
        throw new Error('Please enter a valid password')
    }
    if(!validator.isAlphanumeric(validate.address,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid address')
    }
    if(!validator.isNumeric(validate.phoneNumber)){
        throw new Error('Please enter a valid phone number')
    }
    if(validate.phoneNumber.length<10){
        throw new Error('Please enter a phone number of atleast 10 digit')
    }
}
const staffeditValidate=(validate)=>{
    if(!validator.isStrongPassword(validate.password,{minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1})) 
    {
        throw new Error('Please enter a valid password')
    }
    if(!validator.isAlphanumeric(validate.address,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid address')
    }
    if(!validator.isNumeric(validate.phoneNumber)){
        throw new Error('Please enter a valid phone number')
    }
    if(validate.phoneNumber.length<10){
        throw new Error('Please enter a phone number of atleast 10 digit')
    }
}
const registrationValidate=(validate)=>{
    if(!validator.isAlpha(validate.name,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid name')
    }
    if(!validator.isEmail(validate.email)){
        throw new Error('Please enter a valid email')
    }
     if(!validator.isAlphanumeric(validate.address,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid address')
    }
    if(!validator.isNumeric(validate.phoneNumber)){
        throw new Error('Please enter a valid phone number')
    }
    if(validate.phoneNumber.length<10){
        throw new Error('Please enter a phone number of atleast 10 digit')
    }
    if(!validator.isNumeric(validate.age)){
        throw new Error('Please enter a valid age')
    }
}
const appointmentValidate=(validate)=>{
    if(!validator.isAlpha(validate.name,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid name')
    }
    if(!validator.isEmail(validate.email)){
        throw new Error('Please enter a valid email')
    }
     if(!validator.isAlphanumeric(validate.address,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid address')
    }
    if(!validator.isNumeric(validate.phoneNumber)){
        throw new Error('Please enter a valid phone number')
    }
    if(validate.phoneNumber.length<10){
        throw new Error('Please enter a phone number of atleast 10 digit')
    }
    if(!validator.isNumeric(validate.age)){
        throw new Error('Please enter a valid age')
    }  
}
const dischargeValidate=(validate)=>{
    if(!validator.isNumeric(validate.bedDays)){
        throw new Error('Please enter a valid bed Days')
    }
     if(!validator.isNumeric(validate.charges)){
        throw new Error('Please enter a valid charges')
    }
}
module.exports={
    patientValidate,
    doctorValidate,
    staffValidate,
    registrationValidate,
    appointmentValidate,
    doctoreditValidate,
    patienteditValidate,
    staffeditValidate,
    dischargeValidate
}