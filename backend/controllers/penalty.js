const {con}=require('../config/conn')
const mysql=require('mysql')
//Insert in penalty table
exports.createPenalty=(req,res)=>{
    let query="insert into penalty(orderItemId,overDueDays,penaltyAmount)values(?,?,?)"
    let param=[req.body.orderItemId,req.body.overDueDays,req.body.penaltyAmount];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//soft delete in penalty table
exports.deletePenalty=(req,res)=>{
    let query="update penalty set isDelete=? where penaltyId=?"
    let param=[true,req.body.penaltyId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//get penalty info
exports.getPenalty=(req,res)=>{
    let query="select * from penalty where isDelete=false"
    let param=["false"]
    query=mysql.format(query);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};