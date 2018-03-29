const {con}=require('../config/conn')
const mysql=require('mysql')
//place order
exports.createOrder=(req,res)=>{
    let query="insert into orders(orderDate,userId,paymentType,totalAmount)values(CURDATE(),?,?,?)"
    let param=[req.body.userId,req.body.paymentType,req.body.totalAmount];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//delete order
exports.deleteOrder=(req,res)=>{
    let query="update orders set isDelete=? where orderId=?"
    let param=[true,req.body.orderId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//get order
exports.getOrders=(req,res)=>{
    let query="select * from orders where isDelete=false"
    let param=["false"]
    query=mysql.format(query);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
//get order by userId
exports.getOrdersByUserId=(req,res)=>{
    let query="select * from orders where userId=?"
    let param=[req.body.userId]
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//get order by Date
exports.getOrdersByDate=(req,res)=>{
    let query="select * from orders where orderDate=? and isDelete=false"
    let param=[req.body.orderDate]
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};