const mongoose=require('mongoose')
const admitSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    patientId:{
        type:Number,
        required:true
    },
    doctor:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    patientWard:{
        type:String,
        required:true
    },
    patientBed:{
        type:String,
        required:true
    }
})
const Admit=mongoose.model('Admit',admitSchema)
module.exports=Admit