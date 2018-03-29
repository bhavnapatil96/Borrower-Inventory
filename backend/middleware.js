let authenticate = (req,res,next)=>{
    console.log("MiddleWare Req.user==>", req.user);
    if(req.user){
        next();
    }else {
        res.json({"alert":`You need to login first!`});
    }
};
module.exports={authenticate};