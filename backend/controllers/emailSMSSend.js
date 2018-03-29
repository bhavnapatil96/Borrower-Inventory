var nodemailer = require('nodemailer');
exports.sendEmail=(req,res)=>{
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user:'lanetteam.jyoti123@gmail.com', // generated ethereal user
                pass: 'lanetteam1' // generated ethereal password
            }
        });
        // setup email data with unicode symbols
        let mailOptions = {
            from: 'lanetteam.jyoti123@gmail.com', // sender address
            to: req.body.receivers, // list of receivers
            subject:req.body.subject, // Subject line
            text: req.body.bodymsg, // plain text body
            //html: '<b>Hello world?</b>' // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send(error);
            }
            res.send("success")
        });
    });
}