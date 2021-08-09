const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    role:{
        type:String,
        trim:true,
        required:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    tokens:[{
        token:{
            type:String
        }
    }],
    department:{
        type:String
    },
    timeFrom:{
        type:Number    
    },
    timeTo:{
        type:Number
    },
    consultancyFee:{
        type:Number
    },
    consultancyDay:{
        type:String
    }
})

userSchema.methods.generateToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},"@#&*")
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.userLogin=async(email,password)=>{
    const user=await User.findOne({email,password})
    if(!user){
        throw new Error('Please enter valid credentials')
    }
    return user
}
 const User=mongoose.model('User',userSchema)

 module.exports=User
