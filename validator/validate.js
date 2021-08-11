const validator =require('validator')
const patientValidate=(validate)=>{
    if(!validator.isAlpha(validate.name,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid name')
    }
    if(typeof validate.patientId!=='number'){
        throw new Error('Please enter a valid patient ID')
    }
    if(!validator.isEmail(validate.email)){
        throw new Error('Please enter a valid email')
    }
    if(!validator.isAlphanumeric(validate.address,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid address')
    }
    if(typeof validate.phoneNumber!=='number'){
        throw new Error('Please enter a valid phone number')
    }
    if(Math.floor(Math.log10(Math.abs(validate.phoneNumber))) + 1<10){
        throw new Error('Please enter a valid phone number')
    }
    if(typeof validate.age!=='number'){
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
    if(typeof validate.phoneNumber!=='number'){
        throw new Error('Please enter a valid phone number')
    }
    if(Math.floor(Math.log10(Math.abs(validate.phoneNumber)))+1<10){
        throw new Error('Please enter a valid phone number')
    }
    if(!validator.isAlpha(validate.department,'en-US',{ignore:'\s'})){
        throw new Error('Please enter a valid department')
    }
    if(typeof validate.timeFrom!=='number'){
        throw new Error('Please enter a valid time from')
    }
    if(typeof validate.timeTo!=='number'){
        throw new Error('Please enter a valid time to')
    }
    if(typeof validate.consultancyFee!=='number'){
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
    if(typeof validate.phoneNumber!=='number'){
        throw new Error('Please enter a valid phone number')
    }
    if(Math.floor(Math.log10(Math.abs(validate.phoneNumber)))+1<10){
        throw new Error('Please enter a valid phone number')
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
    if(typeof validate.phoneNumber!=='number'){
        throw new Error('Please enter a valid phone number')
    }
    if(typeof validate.age!=='number'){
        throw new Error('Please enter a valid age')
    }
    if(Math.floor(Math.log10(Math.abs(validate.phoneNumber))) + 1<10){
        throw new Error('Please enter a valid phone number')
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
    if(typeof validate.phoneNumber!=='number'){
        throw new Error('Please enter a valid phone number')
    }
    if(typeof validate.age!=='number'){
        throw new Error('Please enter a valid age')
    }
    if(Math.floor(Math.log10(Math.abs(validate.phoneNumber))) + 1<10){
        throw new Error('Please enter a valid phone number')
    }  
}
module.exports={
    patientValidate,
    doctorValidate,
    staffValidate,
    registrationValidate,
    appointmentValidate
}