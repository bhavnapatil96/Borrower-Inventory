const {con}=require('../config/conn')
const mysql=require('mysql')
//All manage by trigger not insert query fire
exports.createWallet=(req,res)=>{
    let query="insert into wallet(userId,balance)values(?,?)"
    let param=[req.body.UserId,50];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//get wallet
exports.getWallet=(req,res)=>{
    let query="select balance from wallet where userId=?"
    let param=[req.body.userId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
