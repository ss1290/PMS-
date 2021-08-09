const jwt=require('jsonwebtoken')
const User=require('../models/user')

const Authorization=async(req,res,next)=>{
    try{
        const token=req.query.token
        const decoded=jwt.verify(token,"@#&*")
        const user=await User.findOne({_id:decoded._id,"tokens.token":token})
        if(!user){
            throw new Error('Please login First')
        }
        req.token=token
        req.user=user
        next()
    }catch(error){
        res.send('Please login first!')
    }
}
module.exports=Authorization