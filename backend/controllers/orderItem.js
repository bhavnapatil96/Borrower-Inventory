const {con}=require('../config/conn')
const mysql=require('mysql')
//create order item
exports.createOrderitem=(req,res)=>{
    let query="insert into orderitem(productId,qty,hireDate,returnDate,totalPrice,orderId)values(?,?,?,?,?,?)"
    let param=[req.body.productId,req.body.qty,req.body.hireDate,req.body.returnDate,req.body.totalPrice,req.body.orderId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//delete order item
exports.deleteOrderitem=(req,res)=>{
    let query="update orderitem set isDelete=? where orderitemId=?"
    let param=[true,req.body.orderitemId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//get order item by id
exports.getOrderitemByorderId=(req,res)=>{
    let query="select * from orderitem where orderId=? and isDelete=false"
    let param=[req.body.orderId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message": "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//Change order status
exports.statusChanged=(req,res)=>{
    let query="update orderitem set status='clear' where orderItemId=?"
    let param=[req.body.orderItemId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message": "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//get All orderitem
exports.getAllOrderItem=(req,res)=>{
    let query="select * from orderitem"
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message": "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};