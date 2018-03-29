const {con}=require('../config/conn')
var nodemailer = require('nodemailer');
const bcrypt=require('bcryptjs')
const mysql=require('mysql')
//user create
exports.createUser=(req,res)=>{
    let email=req.body.email;
    let q="select email from user where email='"+email+"'";
    con.query(q,(err,result)=>{
        if(result.length>0)
        {res.json({"Error" : true, "Message" : "Email alerty Exist"});}
        else
        {
            let query="insert into user(userName,email,password,contactNo,address,dob,userType)values(?,?,?,?,?,?,?)"
            let bpass=bcrypt.hashSync(req.body.password,10)
            let param=[req.body.username,req.body.email,bpass,req.body.contactNo,req.body.address,req.body.dob,req.body.userType];
            query=mysql.format(query,param);
            con.query(query,(err,result)=>{
                if(err)
                {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
                if(result)
                {
                    if(req.body.userType==='inventoryUser'){
                        nodemailer.createTestAccount((err, account) => {
                            let transporter = nodemailer.createTransport({
                                host: 'smtp.gmail.com',
                                port: 587,
                                secure: false,
                                auth: {
                                    user:'lanetteam.jyoti123@gmail.com',
                                    pass: 'lanetteam1'
                                }
                            });
                            let mailOptions = {
                                    from: 'lanetteam.jyoti123@gmail.com',
                                    to: req.body.email,
                                    subject:"Registration Password",
                                text:"Your password is="+req.body.password,
                            };
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log(error)
                                }
                                console.log('Message sent: %s', info.messageId);
                                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                                console.log("success")
                            });
                        });
                    }
                    res.json({result})
                }
            })
        }
    })
};
//edit user
exports.editUser=(req,res)=>{
    let query="update user set userName=?,email=?,contactNo=?,address=?,dob=?,userType=? where userId=?"
  //  let bpass=bcrypt.hashSync(req.body.password,10)
    let param=[req.body.username,req.body.email,req.body.contactNo,req.body.address,req.body.dob,req.body.userType,req.body.userId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//delete user
exports.deleteUser=(req,res)=>{
    let query="update user set isDelete=? where userId=?"
    let param=[true,req.body.userId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//fetch all user
exports.fetchUser=(req,res)=>{
    console.log('In fetch User')
    let query="select * from user"
    con.query(query,(err,result)=>{
        if(err)
        {res.send({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
//top customer
exports.topCustomer=(req,res)=>{
    let query="select u.userName as name ,sum(o.totalAmount) as total from user u,orders o " +
        "WHERE o.userId=u.userId  and u.userType='borrower' GROUP BY o.userId order BY sum(o.totalAmount) DESC  " +
        "LIMIT 2"
    con.query(query,(err,result)=>{
        if(err)
        {res.send({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
//top Inventory user
exports.topInventoryUser=(req,res)=>{
    let query="SELECT user.userName as name,sum(orderitem.qty) as total " +
        "FROM product,orderitem,user " +
        "WHERE orderitem.productId=product.productId " +
        "   and user.userId =product.userId  " +
        "   AND user.userType='inventoryUser' " +
        "GROUP BY user.userName " +
        "order by sum(orderitem.qty) desc " +
        "LIMIT 2  "
    con.query(query,(err,result)=>{
        if(err)
        {res.send({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
//get All user
exports.getUser=(req,res)=>{
    let query="select * from user where userId=?"
    let param=[req.body.userId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//change password
exports.changePassword=(req,res)=>{
    let query="select password from user where userId=?"
    let param=[req.body.userId];
    let pass=req.body.password;
    let newPass=req.body.newPassword;
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err){
            res.json({"Error":true,"Message":"Error in executing mySQl query"});
        }
        if(result)
        {
            console.log(result[0].password);
            if(bcrypt.compareSync(pass,result[0].password)){
                let hash=bcrypt.hashSync(newPass,10);
                let q="update user set password=? where userId=?";
                let p=[hash,req.body.userId];
                q=mysql.format(q,p)
                con.query(q,(err,result)=>{
                    if(err){
                        res.json({"Error":true,"Message":"Error in executing mySQl query"});
                    }
                    if(result) {
                        res.json({result})
                    }
                })
            }
            else{
                res.json({"Error":true,"Message":"Current Password not Matched"});
            }
        }
    })
};
//get Inventory user
exports.getInventoryUser=(req,res)=>{
    let query="select * from user where userType='inventoryUser'"
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
//get customer
exports.getCustomer=(req,res)=>{
    let query="select * from user where userType='borrower'"
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
//count customer
exports.countCustomer=(req,res)=>{
    let query="select count(*) as count from user where userType='borrower' and isDelete=0"
    query=mysql.format(query);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//count InventoryUser
exports.countInventoryUser=(req,res)=>{
    let query="select count(*) as count from user where userType='inventoryUser' and isDelete=0"
    query=mysql.format(query);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};