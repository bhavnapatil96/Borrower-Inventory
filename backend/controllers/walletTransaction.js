const {con}=require('../config/conn')
const mysql=require('mysql')
//wallet entry
exports.createWalletTransaction=(req,res)=> {
    let query = "insert into wallettransaction(userId,transactionDate,cardDetails,amount,status,description)values(?,CURDATE(),?,?,?,?)"
    let param = [req.body.userId, req.body.card, req.body.amount, req.body.status,req.body.description];
    query = mysql.format(query, param);
    con.query(query, (err, result) => {
        if (err) {
            console.log('error...',err)
            res.json({"Error": true, "Message": "Error in executing MySQL query"});
        }
            if (result){
                res.json({result})
            }
    })
}
//get wallet
exports.getTransctionByUserId=(req,res)=>{
    let query="select * from wallettransaction where userId=?"
    let param=[req.body.userId];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {res.json({"Error" : true, "Message" : "Error in executing MySQL query"});}
        if(result)
        {res.json({result})}
    })
};
