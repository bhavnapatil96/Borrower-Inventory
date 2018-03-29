const {con}=require('../config/conn')
const mysql=require('mysql')
//get credit point of admin or particular Inventory User
exports.getCreditPoint=(req,res)=>{
    let query="select creditPoints from user where userId=?"
    let param=[req.params.id];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//get credit point transaction detail of admin or Inventory User
exports.getCreditPointTransaction=(req,res)=>{
    let query="SELECT * FROM creditpointtransaction WHERE userId=?"
    let param=[req.params.id];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
