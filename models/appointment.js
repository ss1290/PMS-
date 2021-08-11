const mongoose=require('mongoose')

const appointmentSchema=new mongoose.Schema({
    patientId:{
        type:Number
    },
    department:{
        type:String
    },
    doctor:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    name:{
        type:String,
        required:true,
        trim:true
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
    }
})
const Appointment=mongoose.model('Appointment',appointmentSchema)

module.exports=Appointment