const {con}=require('../config/conn')
const mysql=require('mysql')
//create category
exports.createCategory=(req,res)=>{
    let query="insert into category(categoryName)values(?)"
    let param=[req.body.categoryName];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {
            res.json({"Error" : true, "Message" : "Error in executing MySQL query"});
        }
        if(result)
        {
            res.json({result})
        }
    })
};
//delete category
exports.deleteCategory=(req,res)=>{
    let query="update category set isDelete=? where categoryId=?"
    let param=[true,req.body.categoryId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//get All category
exports.getCategory=(req,res)=>{
    let query="select * from category where isDelete=false"
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};


