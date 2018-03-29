global.token='';
global.obj={};
var cors=require('cors');
const {con}=require('./config/conn')
const mysql=require('mysql')
const express=require('express');
const bodyParser=require('body-parser');
var passport=require('passport');
const session = require('express-session');
var app=express();
var fileUpload=require('express-fileupload');
var cron = require('node-cron');
app.use(session({secret:'token'}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.static(__dirname+"/"));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials",true);
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Allow-Methods`, `DELETE`);
    res.header(`Access-Control-Allow-Methods`, `PATCH`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
});
require("./routes/index")(app,passport);
function runQuery(query, id,days,penaltyAmount,status){
    return new Promise((resolve, reject)=>{
        con.query(query, (err, response) => {
            if(err) return reject(err);
            resolve({response: response, item: id,days:days,penaltyAmount:penaltyAmount,status:status, query: query});
        });
    });
}
//Running a task every Day
cron.schedule('0 0 * * *', function(req,res){
    let query="select * from orderitem where returnDate < CURDATE() and status='pending'";
    query=mysql.format(query);
    con.query(query,(err,result)=>{
        if(err)
        {
            console.log('error',err)
            res.json({"Error" : true, "Message" : "Error in executing MySQL query"});
        }
        if(result)
        {
            var _promise = []
            result.forEach((item)=>{
                let days=parseInt((new Date() - item.returnDate)  / (1000 * 60 * 60 * 24))
                let itemId=item.orderItemId;
                console.log("type",typeof itemId)
                let penaltyAmount=item.totalPrice*0.05;
                let status='pending'
                let q="select * from penalty where orderItemId=? and status=?";
                let pr=[itemId,'pending'];
                q=mysql.format(q,pr);
                _promise.push(runQuery(q, itemId,days,penaltyAmount,status));
            });

            Promise.all(_promise)
                .then((results) => {
                    results.forEach((res) => {
                        console.log('Response Penalty ==' ,res.response, res.item);
                        if(res)
                        {
                            if(res.response && res.response.length){
                                let i="update penalty set overDueDays=overDueDays+1,penaltyAmount=penaltyAmount+? where orderItemId=?";
                                let p=[res.penaltyAmount,res.item];
                                i=mysql.format(i,p);
                                con.query(i,(err,re)=>{
                                    if(err){
                                        console.log("Error.......",err)
                                    }
                                    if(re){
                                        console.log("Updated.......")
                                    }
                                })
                            }
                            else{
                                let i="insert into penalty(orderItemId,overDueDays,penaltyAmount,status)values(?,?,?,?)";
                                let p=[res.item,res.days,res.penaltyAmount,res.status];
                                i=mysql.format(i,p);
                                con.query(i,(err,re)=>{
                                    if(re){
                                        console.log("Inserted.......")
                                    }
                                })
                            }
                        }

                    });
                })
                .catch((err)=>{
                    console.error('error while')
                });
        }
    })
});
app.get('/',(res,resp)=>{
    resp.sendFile(__dirname + '/');
});
app.listen(3004,()=>{
    console.log('server is started');
});
