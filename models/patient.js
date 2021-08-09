const mongoose=require('mongoose')
const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    patientId:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    address:{
        type:String
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    },
    birthDate:{
        type:String,
        required:true
    }
})
const Patient=mongoose.model('Patient',patientSchema)

module.exports=Patient