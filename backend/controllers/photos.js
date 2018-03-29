const {con}=require('../config/conn')
const mysql=require('mysql')
//photos entry
exports.createPhoto=(req,res)=>{
    let query="insert into photos(productId,photo)values(?,?)"
    let param=[req.body.productId,req.body.photo];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//soft delete photos entry
exports.deletePhoto=(req,res)=>{
    let query="update photos set isDelete=? where photoId=?"
    let param=[true,req.body.photoId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//get photos
exports.getphotos=(req,res)=>{
    let query="select * from photos where productId=?"
    let param=[req.body.productId];
    con.query(query,(err,result)=>{
        if(err)
        {
            console.log('error',err)
            res.json({"Error" : true, "Message" : "Error in executing MySQL query"});
        }
        if(result)
        {
            console.log('response',result)
            res.json({result})
        }
    })
};


