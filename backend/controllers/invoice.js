let https = require("https");
let fs  = require("fs");
let nodemailer = require('nodemailer');
function generateInvoice(invoice, filename, success, error) {
    let postData = JSON.stringify(invoice);
    let options = {
        hostname  : "invoice-generator.com",
        port      : 443,
        path      : "/",
        method    : "POST",
        headers   : {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData)
        }
    };
    let file = fs.createWriteStream(filename);
    let req = https.request(options, function(res) {
        res.on('data', function(chunk) {
            file.write(chunk);
        })
            .on('end', function() {
                file.end();
                if (typeof success === 'function') {
                    success();
                }
            });
    });
    req.write(postData);
    req.end();
    if (typeof error === 'function') {
        req.on('error', error);
    }
}
let invoice = {
    logo: "http://lanetteam.com:3004/controllers/upload/BI.png",
    from: "405/406 Luxuria Business Hub",
    to: "Jyoti",//username
    currency: "usd",//rupees
    number: "INV-0001",//bill number
    payment_terms: "Auto-Billed - Do Not Pay",//wallet or cod
    items: [
        {
            name: "Subscription to Starter",
            quantity: 1,
            unit_cost: 50
        }//Number of items added
    ],
    // fields: {
    //     tax: "%"
    // },
    // tax: 5,
    notes: "Thanks for being an awesome customer!",
   // terms: "No need to submit payment. You will be auto-billed for this invoice."
};
exports.sendBill=(req,res)=> {
    generateInvoice(invoice, './uploadBill/invoice.pdf', function () {
            console.log("successful invoice.pdf made ")
            console.log("send to customer")
            nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'lanetteam.jyoti123@gmail.com', // generated ethereal user
                        pass: 'lanetteam1' // generated ethereal password
                    }
                });
                let mailOptions = {
                    from: 'lanetteam.jyoti123@gmail.com',
                    to: 'lanetteam.bhavna@gmail.com',
                    subject: 'Your Receipt of order',
                    text: 'send receipt',
                    attachments: [{filename: 'invoice.pdf', path: './uploadBill/invoice.pdf'}]
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.send(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    res.send("success")
                });
            });
        },
        function (error) {
            console.error(error);
        });
}


