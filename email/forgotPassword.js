const sgMail=require('@sendgrid/mail')
sgMail.setApiKey('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')

const sendForgotEmail=(email,link)=>{
    sgMail.send({
        to:email,
        from:'sonushashankmot@gmail.com',
        subject:'Password Reset Link',
        text:`Click on the given link  ${link}  to reset your Password.
        If you have any further problems please contact your administrator.`


    })
}

module.exports={sendForgotEmail}