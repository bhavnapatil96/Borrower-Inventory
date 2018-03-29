const {con}=require('../config/conn')
const mysql=require('mysql')
//insert in product
exports.createProduct=(req,res)=>{
    let sampleFile=req.files.photo
    sampleFile.mv(__dirname+'/upload/'+sampleFile.name)
    let query="insert into product(productName,categoryId,manufacturer,userId,stock,price,photo,discount,description)values(?,?,?,?,?,?,?,?,?)"
    let param=[req.body.productName,req.body.categoryId,req.body.manufacturer,req.body.userId,req.body.stock,req.body.price,sampleFile.name,req.body.discount,req.body.description];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//edit in product
exports.editProduct=(req,res)=>{
    let query="update product set productName=?,categoryId=?,manufacturer=?,userId=?,stock=?,price=?,discount=?,description=? where productId=?"
    let param=[req.body.productName,req.body.categoryId,req.body.manufacturer,req.body.userId,req.body.stock,req.body.price,req.body.discount,req.body.description,req.body.productId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//soft delete in product
exports.deleteProduct=(req,res)=>{
    let query="update product set isDelete=? where productId=?"
    let param=[true,req.body.productId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//get all product
exports.fetchProduct=(req,res)=>{
    let query="select * from product where isDelete=false and isApprove=false"
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//get by userid
exports.fetchUserProduct=(req,res)=>{
    let query="select * from product where userId="+req.params.id;
    con.query(query,(err,result)=>{
        if(err)
        { res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//top product selling
exports.topProduct=(req,res)=>{
    let query="SELECT product.productName as name,sum(orderitem.qty) as total FROM product,orderitem " +
        "WHERE orderitem.productId=product.productId " +
        "GROUP BY orderitem.productId " +
        "order by sum(orderitem.qty) desc " +
        "LIMIT 2"
    con.query(query,(err,result)=>{
        if(err)
        {res.send({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
//product unapproved by admin
exports.unApproved=(req,res)=>{
    let query="update product set isApprove=? where productId=?"
    let param=[req.body.approved,req.body.productId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//fetch info of product by id
exports.fetchProductById=(req,res)=>{
    let query="select * from product where productId=? and isDelete=false and isApprove=false";
    let param=[req.body.productId];
    query=mysql.format(query,param);
     con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//count of product
exports.countProduct=(req,res)=>{
    let query="select count(*) as count from product where isDelete=0"
    query=mysql.format(query);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
//fetch user by product
exports.fetchUserProducts=(req,res)=>{
    let query="select * from product where userId="+req.params.id;
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
//fetch user by product
exports.fetchUserProduct=(req,res)=>{
    let query="select productName as name, stock as total from product where userId="+req.params.id;
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
//fetch user by product of selll
exports.fetchUserProductSell=(req,res)=>{
    let query="SELECT product.productName as name, sum(orderitem.qty) as total FROM product,orderitem,user "+
        "WHERE user.userId=product.userId and orderitem.productId=product.productId and user.userId="+req.params.id+
        " group by product.productName";
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
//fetch user by product count
exports.fetchUserProductCnt=(req,res)=>{
    let query="select stock from product where userId="+req.params.id;
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
//fetch user by product sell count
exports.fetchUserProductSellCnt=(req,res)=>{
    let query="SELECT count(*) as cnt FROM product,orderitem,user WHERE user.userId=product.userId and orderitem.productId=product.productId and user.userId="+req.params.id;
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.send(result)}
    })
};
