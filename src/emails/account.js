const sgmail = require('@sendgrid/mail')


sgmail.setApiKey(process.env.SENDGRID_API_KEY);
// sgmail.send({
//     to: 'akshatgupta486@gmail.com',
//     from:'akshat4guptajan@gmail.com',
//     subject : 'this is first creation',
//     text:`Welcome to app ,let me know how you get along with this app`
// })

const sendWelcomeEmail = (email,name)=>{
    sgmail.send({
        to: email,
        from:'codestore.world@gmail.com',
        subject : 'Welcome to Codestore',
        text:`hello ${name}`,
        html: `<div style="background: rgb(250, 250, 250);"><div style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;display:block;width:600px;max-width:600px;margin:0 auto!important;" valign="top" width="600"><div style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px"><span style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">A request has been received to change the password for your Codestore account.</span><div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><h2 style="margin:0;margin-bottom:30px;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">Hello ${name},</h2><p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300"><strong>Welcome to Codestore</strong></p><p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">Hope you like this app, let me know how you get along with this app.</p></td></tr><tr><td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300"></p></td></tr><tr><td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">&nbsp;</p><br><p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">Thank you,<br>The CodeStore Team</p></td></tr></tbody></table></td></tr></tbody></table></div><div style="box-sizing:border-box;clear:both;width:100%"><table style="box-sizing:border-box;width:100%;border-spacing:0;font-size:12px;border-collapse:separate!important" width="100%"><tbody><tr style="font-size:12px"><td><p style="color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;margin-bottom:5px;margin:10px 0 20px">Send with Confidence</p></td></tr></tbody></table></div></div></div></div>`
    })
}

const resetPassword = (email,name,_id) => {
    // console.log(email,name,_id);
    sgmail.send({
        to:email,
        from: 'codestore.world@gmail.com',
        subject:'Reset password',
        text:`Hello ${name} a reset password request came, click`,
        html:`<div style="background: rgb(250, 250, 250);"><div style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;display:block;width:600px;max-width:600px;margin:0 auto!important;" valign="top" width="600"><div style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px"><span style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">A request has been received to change the password for your Codestore account.</span><div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><h2 style="margin:0;margin-bottom:30px;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">Hello ${name},</h2><p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300"><strong>A request has been received to change the password for your Codestore account.</strong></p></td></tr><tr><td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%"><tbody><tr><td align="center" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top"><table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important"><tbody><tr><td align="center" bgcolor="#348eda" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top"><a href="${process.env.DOMAIN}/resetpassword/${_id}" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px" target="_blank">Reset Password</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">&nbsp;<br><p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">Thank you,<br>The CodeStore Team</p></td></tr></tbody></table></td></tr></tbody></table></div><div style="box-sizing:border-box;clear:both;width:100%"><table style="box-sizing:border-box;width:100%;border-spacing:0;font-size:12px;border-collapse:separate!important" width="100%"><tbody><tr style="font-size:12px"><td><p style="color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;margin-bottom:5px;margin:10px 0 20px">Send with Confidence</p></td></div></div></div></div>`
    })
}

// const sendCancelationEmail = (email,name) => {
//     sgmail.send({
//         to: email,
//         from:'codestore.world@gmail.com',
//         subject : 'this is first creation',
//         text:`GoodBye ${name} ,`
//     })
// }

module.exports = {
    sendWelcomeEmail,
    resetPassword
}
