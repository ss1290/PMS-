const express=require('express')
const path=require('path')
const hbs=require('hbs')
const mongoose=require('mongoose')
const User=require('../models/user')
const Patient=require('../models/patient')
const Admit=require('../models/admitpatient')
const Discharge=require('../models/dischargepatient')
const Appointment=require('../models/appointment')
const Authorization=require('../middleware/auth')
const {sendForgotEmail}=require('../email/forgotPassword')
const validator =require('validator')
const {patientValidate,doctorValidate, staffValidate,registrationValidate,appointmentValidate,doctoreditValidate,patienteditValidate,staffeditValidate,dischargeValidate}=require('../validator/validate')
mongoose.connect('mongodb+srv://Shashank:Sonu123@cluster0.orib0.mongodb.net/PMS?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})

const app=express()
const port=process.env.PORT||3000

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../views')

app.set('view engine','hbs')
app.set('views',viewsPath)

app.use(express.static(publicDirectoryPath))


//login
app.get('/login',async(req,res)=>{
    try{
        const user=await User.userLogin(req.query.email,req.query.password)
        const token=await user.generateToken()
        res.send({
            role:user.role,
            token
        })
    }catch(error){
        res.send({Error:error.message})
    }
})
app.get('',async(req,res)=>{
    res.render('login',{})
})


//Admin Routers
app.get('/dashboard/admin',Authorization,async(req,res)=>{  
        res.render('adminDashboard',{})
    })
    app.get('/admit/patient',Authorization,async(req,res)=>{
        try{
            const patient=await Patient.findOne({name:req.query.name,patientId:req.query.patientId})
            if(!patient){
                throw new Error('No Patient Registered with this name and Id')
            }
            const doctor=await User.findOne({name:req.query.doctorname,department:req.query.department})
            if(!doctor){
                throw new Error('No Doctor available with given name in this department')
            }
            const admit=new Admit({
                name:req.query.name,
                patientId:req.query.patientId,
                doctor:req.query.doctorname,
                department:req.query.department,
                date:req.query.date,
                patientWard:req.query.patientWard,
                patientBed:req.query.patientBed
            })
            await admit.save()
            res.send({admit})
        }catch(error){
            res.send({Error:error.message})
        }
    })
    app.get('/admin/admit',Authorization,async(req,res)=>{
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
        month = '0' + month.toString();
        if(day < 10)
        day = '0' + day.toString();
        var minDate = year + '-' + month + '-' + day;    
        const doctor=await User.find({role:'doctor'})
        const patient=await Patient.find({})
        res.render('adminpatientadmit',{
            doctor,
            patient,
            minDate
        })
    })

    app.get('/discharge/patient',Authorization,async(req,res)=>{
        try{
            const patient=await Patient.findOne({name:req.query.name,patientId:req.query.patientId})
            if(!patient){
                throw new Error('No Patient Registered with this name and Id')
            }
            const doctor=await User.findOne({name:req.query.doctorname,department:req.query.department})
            if(!doctor){
                throw new Error('No Doctor available with given name in this department')
            }
            const admit=await Admit.findOne({patientWard:req.query.patientWard,patientBed:req.query.patientBed})
            if(!admit){
                throw new Error('No Patient Admitted with this name in given ward and bed')
            } 
            const discharge=new Discharge({
                name:req.query.name,
                patientId:req.query.patientId,
                doctor:req.query.doctorname,
                department:req.query.department,
                date:req.query.date,
                patientWard:req.query.patientWard,
                patientBed:req.query.patientBed,
                bedDays:req.query.bedDays,
                charges:req.query.charges
            })
            dischargeValidate(req.query)
            await discharge.save()
            res.send({discharge})
        }catch(error){
            res.send({Error:error.message})
        }
    })
    app.get('/admin/discharge',Authorization,async(req,res)=>{
        const admit=await Admit.find({})
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
        month = '0' + month.toString();
        if(day < 10)
        day = '0' + day.toString();
        var minDate = year + '-' + month + '-' + day; 
        res.render('adminpatientdischarge',{
            admit,
            minDate
        })
    })
    app.get('/admin/appointments',Authorization,async(req,res)=>{
        res.render('adminappointments',{})
    })
    app.get('/doctor/appointments',Authorization,async(req,res)=>{
        res.render('doctorappointments',{})
    })
    app.get('/patient/appointment',Authorization,async(req,res)=>{
        const page=parseInt(req.query.page, 20) || 0
        const Appointments=await Appointment.find({}).skip(page*20).limit(20)
        res.send({Appointments})
    })
app.get('/signup/doctor',Authorization,async(req,res)=>{
    try{
        doctorValidate(req.query) 
        const doctor=new User({
            role:'doctor',
            name:req.query.name,
            email:req.query.email,
            password:req.query.password,
            address:req.query.address,
            phoneNumber:req.query.phoneNumber,
            department:req.query.department,
            timeFrom:req.query.timeFrom,
            timeTo:req.query.timeTo,
            consultancyFee:req.query.consultancyFee,
            consultancyDay:req.query.consultancyDay
    }) 
    const Doctor=await User.findOne({email:req.query.email})
    if(Doctor){
        throw new Error('User Already Exist')
    }
    await doctor.save()
    res.send({doctor})
    }catch(error){
        res.send({Error:error.message})
    }    
})
app.get('/admin/doctor',Authorization,async(req,res)=>{
    res.render('admindoctor',{

    })
})
 app.get('/add/patient',Authorization,async(req,res)=>{
        try{
            patientValidate(req.query)
            const patient=new Patient({
                name:req.query.name,
                patientId:req.query.patientId,
                email:req.query.email,
                address:req.query.address,
                phoneNumber:req.query.phoneNumber,
                age:req.query.age,
                gender:req.query.gender,
                bloodGroup:req.query.bloodGroup,
                birthDate:req.query.birthDate
            })
            const oldPatient=await Patient.findOne({email:req.query.email})
            if(oldPatient){
                throw new Error('User Already Exist')
            }
            await patient.save()
            res.send({patient})
        }catch(error){
            res.send({Error:error.message})
        }
    })
    app.get('/admin/patient',Authorization,async(req,res)=>{
    res.render('adminpatient',{})
})

app.get('/signup/staff',Authorization,async(req,res)=>{
    try{
        staffValidate(req.query)
        const staff=new User({
            role:'staff',
            name:req.query.name,
            email:req.query.email,
            password:req.query.password,
            address:req.query.address,
            phoneNumber:req.query.phoneNumber
        })
        const Staff=await User.findOne({email:req.query.email})
        if(Staff){
        throw new Error('User Already Exist')
    }
            await staff.save()
            res.send({staff})
        }catch(error){
            res.send({Error:error.message})
        }
    })
    app.get('/admin/staff',Authorization,async(req,res)=>{
        res.render('adminstaff',{})
    })
    app.get('/profile',Authorization,async(req,res)=>{
        try{
            if(req.query.oldpassword){
                if(req.query.oldpassword!=req.user.password){
                    throw new Error('Please enter right password')
                }
            }
            if(req.query.newpassword!==req.query.confirmpassword){
                throw new Error('Confirm password and New password should be same')
            }
            if(req.query.newpassword){{
                if(!validator.isStrongPassword(req.query.newpassword,{
                    minLength: 8, minLowercase: 1,
                    minUppercase: 1, minNumbers: 1, minSymbols: 1})) 
                    {
                        throw new Error('Please choose a password of 8 characters with atleast one lowercase letter and one uppercase letter and one symbol')
                    }
                    await User.findByIdAndUpdate(req.user._id,{
                        name:req.query.name,
                        email:req.query.email,
                        address:req.query.address,
                        phoneNumber:req.query.phoneNumber,
                        password:req.query.newpassword
                    })
                }}else{
                    await User.findByIdAndUpdate(req.user._id,{
                    name:req.query.name,
                    email:req.query.email,
                    address:req.query.address,
                    phoneNumber:req.query.phoneNumber
                })
            }
            res.send({admin:req.user})
        }catch(error){
            res.send({Error:error.message})
        }
    })
    app.get('/adminprofile',Authorization,async(req,res)=>{
        res.render('adminprofile',{
            name:req.user.name,
            email:req.user.email,
            address:req.user.address,
            phoneNumber:req.user.phoneNumber
        })
    })
    app.get('/doctor/edit',Authorization,async(req,res)=>{
        const id=req.query.id
        const doctor=await User.findById(id)
        res.render('doctoredit',{doctor
        })
    })
    app.get('/doctor/update',Authorization,async(req,res)=>{
        try{
            const id=req.query.id
            doctoreditValidate(req.query)
            const doctor=await User.findByIdAndUpdate(id,{
                password:req.query.password,
                address:req.query.address,
                phoneNumber:req.query.phoneNumber,
                department:req.query.department,
                timeFrom:req.query.timeFrom,
                timeTo:req.query.timeTo,
                consultancyFee:req.query.consultancyFee,
                consultancyDay:req.query.consultancyDay
        })
        res.send({doctor})
        }catch(error){
            res.send({Error:error.message})
        }  
    })
    app.get('/staff/edit',Authorization,async(req,res)=>{
        const id=req.query.id
        const staff=await User.findById(id)
        res.render('staffedit',{staff
        })
    })
    app.get('/staff/update',Authorization,async(req,res)=>{
        try{
            const id=req.query.id
            staffeditValidate(req.query)
            const staff=await User.findByIdAndUpdate(id,{
                password:req.query.password,
                address:req.query.address,
                phoneNumber:req.query.phoneNumber
            })
            res.send({staff})
        }catch(error){
            res.send({Error:error.message})
        }  
        })
        
    app.get('/patient/edit',Authorization,async(req,res)=>{
        const id=req.query.id
        const patient=await Patient.findById(id)
        res.render('patientedit',{patient
        })
    })
    app.get('/patient/update',Authorization,async(req,res)=>{
        try{
            const id=req.query.id
            patienteditValidate(req.query)
            const patient=await Patient.findByIdAndUpdate(id,{
                patientId:req.query.patientId,
                address:req.query.address,
                phoneNumber:req.query.phoneNumber,
                age:req.query.age,
                gender:req.query.gender,
                bloodGroup:req.query.bloodGroup,
                birthDate:req.query.birthDate
            })
            res.send({patient})
        }catch(error){
            res.send({Error:error.message})
        }
    })
    app.get('/admit/edit',Authorization,async(req,res)=>{
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
        month = '0' + month.toString();
        if(day < 10)
        day = '0' + day.toString();
        var minDate = year + '-' + month + '-' + day; 
        const id=req.query.id
        const admit=await Admit.findById(id)
        const doctor=await User.find({role:'doctor'})
        const patient=await Patient.find({})
        res.render('admitedit',{admit,doctor,patient,minDate})
    })
    app.get('/admit/update',Authorization,async(req,res)=>{
        try{
            const patient=await Patient.findOne({name:req.query.name,patientId:req.query.patientId})
            if(!patient){
                throw new Error('No Patient Registered with this name and Id')
            }
            const doctor=await User.findOne({name:req.query.doctorname,department:req.query.department})
            if(!doctor){
                throw new Error('No Doctor available with given name in this department')
            }
            const id=req.query.id
            const admit=await Admit.findByIdAndUpdate(id,{
                name:req.query.name,
                patientId:req.query.patientId,
                doctor:req.query.doctorname,
                department:req.query.department,
                date:req.query.date,
                patientWard:req.query.patientWard,
                patientBed:req.query.patientBed
            })
            res.send({admit})
        }catch(error){
            res.send({Error:error.message})
        }
    })
    app.get('/discharge/edit',Authorization,async(req,res)=>{
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
        month = '0' + month.toString();
        if(day < 10)
        day = '0' + day.toString();
        var minDate = year + '-' + month + '-' + day; 
        const id=req.query.id
        const discharge=await Discharge.findById(id)
        const admits=await Admit.find({})
        res.render('dischargedit',{discharge,minDate,admits})
    })
    app.get('/discharge/update',Authorization,async(req,res)=>{
        try{
            dischargeValidate(req.query)
            const patient=await Patient.findOne({name:req.query.name,patientId:req.query.patientId})
            if(!patient){
                throw new Error('No Patient Registered with this name and Id')
            }
            const doctor=await User.findOne({name:req.query.doctorname,department:req.query.department})
            if(!doctor){
                throw new Error('No Doctor available with given name in this department')
            }
            const admit=await Admit.findOne({patientWard:req.query.patientWard,patientBed:req.query.patientBed})
            if(!admit){
                throw new Error('No Patient Admitted with this name in given ward and bed')
            }
            const id=req.query.id
            const discharge=await Discharge.findByIdAndUpdate(id,{
                name:req.query.name,
                patientId:req.query.patientId,
                doctor:req.query.doctorname,
                department:req.query.department,
                date:req.query.date,
                patientWard:req.query.patientWard,
                patientBed:req.query.patientBed,
                bedDays:req.query.bedDays,
                charges:req.query.charges
            })
            res.send({discharge})
        }catch(error){
            res.send({Error:error.message})
        }
    })
    app.get('/appointment/edit',Authorization,async(req,res)=>{
        const id=req.query.id
        const appointment=await Appointment.findById(id)
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
        month = '0' + month.toString();
        if(day < 10)
        day = '0' + day.toString();
        var minDate = year + '-' + month + '-' + day; 
        const doctor=await User.find({role:'doctor'})
        res.render('editappointment',{appointment,doctor,minDate})
    })
    app.get('/appointment/update',Authorization,async(req,res)=>{
        try{
            const id=req.query.id
            registrationValidate(req.query)
            const doctor=await User.findOne({name:req.query.doctor,department:req.query.department})
            if(!doctor){
                throw new Error('No Doctor available with given name in this department')
            }
            const patient=await Patient.findOne({
                name:req.query.name,
                email:req.query.email
            })
            if(patient){
                throw new Error('Patient already registered')
            }
            const appointment=await Appointment.findByIdAndUpdate(id,{
                doctor:req.query.doctor,
                department:req.query.department,
                date:req.query.date,
                time:req.query.time,
                name:req.query.name,
                email:req.query.email,
                address:req.query.address,
                phoneNumber:req.query.phoneNumber,
                age:req.query.age,
                gender:req.query.gender,
                bloodGroup:req.query.bloodGroup
            })
            res.send({appointment})
        }catch(error){
            res.send({Error:error.message})
        }
    })
    app.get('/user/delete',Authorization,async(req,res)=>{
        const id=req.query.id
        await User.findByIdAndDelete(id)
        res.redirect('back')
    })
     app.get('/appointment/delete',Authorization,async(req,res)=>{
        const id=req.query.id
        await Appointment.findByIdAndDelete(id)
        res.redirect('back')
    })

     app.get('/patient/delete',Authorization,async(req,res)=>{
        var id=req.query.id
        await Patient.findByIdAndDelete(id)
        res.redirect('back')
    })
    app.get('/doctor/show',Authorization,async(req,res)=>{
        const page=parseInt(req.query.page, 20) || 0
        const doctors=await User.find({role:'doctor'}).skip(page*20).limit(20)
        res.send({doctors})
    })
    app.get('/staff/show',Authorization,async(req,res)=>{
        const page=parseInt(req.query.page, 20) || 0
        const staffs=await User.find({role:'staff'}).skip(page*20).limit(20)
        res.send({staffs})
    })
    app.get('/patient/show',Authorization,async(req,res)=>{
        const page=parseInt(req.query.page, 20) || 0
        const patients=await Patient.find({}).skip(page*20).limit(20)
        res.send({patients})
    })
    app.get('/patientshow',Authorization,async(req,res)=>{
        res.render('patientdetails',{})
    })
    app.get('/admit/show',Authorization,async(req,res)=>{
        const page=parseInt(req.query.page, 20) || 0
        const Admits=await Admit.find({}).skip(page*20).limit(20)
        res.send({Admits})
    })
      app.get('/discharge/show',Authorization,async(req,res)=>{
        const page=parseInt(req.query.page, 20) || 0
        const Discharges=await Discharge.find({}).skip(page*20).limit(20)
        res.send({Discharges})
    })
    




    //Doctor Router
    app.get('/dashboard/doctor',Authorization,async(req,res)=>{
        res.render('doctorDashboard',{})
    })
    app.get('/doctorprofile',Authorization,async(req,res)=>{
        res.render('doctorprofile',{
            name:req.user.name,
            email:req.user.email,
            address:req.user.address,
            phoneNumber:req.user.phoneNumber
        })
    })
    app.get('/doctor/patient',Authorization,async(req,res)=>{
    res.render('doctorpatient',{})
})

    
    //Staff Router
    app.get('/dashboard/staff',Authorization,async(req,res)=>{
        res.render('staffDashboard',{
            name:req.user.name,
            email:req.user.email,
            address:req.user.address,
            phoneNumber:req.user.phoneNumber
        })
    })
    app.get('/staffprofile',Authorization,async(req,res)=>{
        res.render('staffprofile',{
            name:req.user.name,
            email:req.user.email,
            address:req.user.address,
            phoneNumber:req.user.phoneNumber,
        })
    })
  
    app.get('/staff/patient',Authorization,async(req,res)=>{
    res.render('staffpatient',{})
})
app.get('/staff/admit',Authorization,async(req,res)=>{
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
        month = '0' + month.toString();
        if(day < 10)
        day = '0' + day.toString();
        var minDate = year + '-' + month + '-' + day;    
        const doctor=await User.find({role:'doctor'})
        const patient=await Patient.find({})
        res.render('staffpatientadmit',{
            doctor,
            patient,
            minDate
        })
    })
    app.get('/staff/discharge',Authorization,async(req,res)=>{
        const admit=await Admit.find({})
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
        month = '0' + month.toString();
        if(day < 10)
        day = '0' + day.toString();
        var minDate = year + '-' + month + '-' + day; 
        res.render('staffpatientdischarge',{
            admit,
            minDate
        })
    })
    app.get('/staff/patientregistration',Authorization,async(req,res)=>{
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
        month = '0' + month.toString();
        if(day < 10)
        day = '0' + day.toString();
        var minDate = year + '-' + month + '-' + day; 
        const doctor=await User.find({role:'doctor'})
        res.render('patientregistration',{doctor,minDate})
    })
    app.get('/patient/registration',Authorization,async(req,res)=>{
        try{
            registrationValidate(req.query)
            const doctor=await User.findOne({name:req.query.doctor,department:req.query.department})
            if(!doctor){
                throw new Error('No Doctor available with given name in this department')
            }
            const patient=await Patient.findOne({
                name:req.query.name,
                email:req.query.email
            })
            if(patient){
                throw new Error('Patient already registered')
            }
            const registration=new Appointment({
                doctor:req.query.doctor,
                department:req.query.department,
                date:req.query.date,
                time:req.query.time,
                name:req.query.name,
                email:req.query.email,
                address:req.query.address,
                phoneNumber:req.query.phoneNumber,
                age:req.query.age,
                gender:req.query.gender,
                bloodGroup:req.query.bloodGroup
        })
        await registration.save()
        res.send({registration})
        }catch(error){
            res.send({Error:error.message})
        }
    })
    app.get('/staff/patientappointment',Authorization,async(req,res)=>{
        const doctor=await User.find({role:'doctor'})
        const patient=await Patient.find({})
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
        month = '0' + month.toString();
        if(day < 10)
        day = '0' + day.toString();
        var minDate = year + '-' + month + '-' + day; 
        res.render('patientappointment',{doctor,patient,minDate})
    })
    app.get('/patient/appointments',Authorization,async(req,res)=>{
        try{
            appointmentValidate(req.query)
            const doctor=await User.findOne({name:req.query.doctor,department:req.query.department})
            if(!doctor){
                throw new Error('No Doctor available with given name in this department')
            }
            const appointment =new Appointment({
                doctor:req.query.doctor,
                department:req.query.department,
                date:req.query.date,
                time:req.query.time,
                name:req.query.name,
                email:req.query.email,
                address:req.query.address,
                phoneNumber:req.query.phoneNumber,
                age:req.query.age,
                gender:req.query.gender,
                bloodGroup:req.query.bloodGroup
            })
        await appointment.save()
        res.send({appointment})
        }catch(error){
            res.send({Error:error.message})
        }
    })
    app.get('/patient/id',Authorization,async(req,res)=>{
        const patient=await Patient.findOne({patientId:req.query.patientId})
        res.send({patient})
    })
    //forgot password
    app.get('/forgot',async(req,res)=>{
        try{
            const user=await User.findOne({email:req.query.email})
            const link=`https://pms-web-application.herokuapp.com/resetform?email=${req.query.email}`
            if(!user){
                throw new Error('Sorry user is not registered.Please try Again!')
            }
            sendForgotEmail(req.query.email,link)
            res.send({user})
        }catch(error){
            res.send({Error:error.message})
        }
    })
     app.get('/forgotPassword',async(req,res)=>{
        res.render('forgotPassword',{})
    })
    app.get('/resetform',async(req,res)=>{
        const email=req.query.email
        res.render('resetform',{email})
    })
    app.get('/success',async(req,res)=>{
        const email=req.query.email
        res.render('success',{email})
    })
    app.get('/updatePassword',async(req,res)=>{
        try{
            if(req.query.confirmpassword!==req.query.password){
                throw new Error('Confirm password and New password should be same')
            }
             if(!validator.isStrongPassword(req.query.password,{minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1})){
                throw new Error('Please enter a valid password')
            }
            const user=await User.findOneAndUpdate({email:req.query.email},{password:req.query.password})
            res.send({user})
        }catch(error){
            res.send({Error:error.message})
        } 
    })
   

    //logout
    app.get('/logoutUser',Authorization,async(req,res)=>{
      try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send({message:"You are logged out"})
    }catch(error){
        res.send({error})
    }
})
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

// const admin=new User({
//     role:'admin',
//     name:'admin',
//     email:'sonushashank420@gmail.com',
//     password:'Admin123@',
//     address:'India',
//     phoneNumber:'9430008432'
// })
// admin.save()
// console.log(admin)
// const staff=new User({
//     role:'staff',
//     name:'Sudhir',
//     email:'sudhir123@gmail.com',
//     password:'Sudhir123@',
//     address:'India',
//     phoneNumber:'8340363323',
// })
// staff.save()
// console.log(staff)
// const patient=new Patient({
//     name:"Max",
//     patientId:"1",
//     email:"max123@gmail.com",
//     address:"India",
//     phoneNumber:"7759871237",
//     age:"27",
//     gender:"Male",
//     bloodGroup:'O+',
//     birthDate:'16/03/1999'
// })
// patient.save()
// console.log(Patient)