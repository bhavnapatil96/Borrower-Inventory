const {con}=require('../config/conn')
var path=require('path')
let fs=require('fs')
const mysql=require('mysql')
//csv upload file for borrower
exports.csvBorrowerFile=(req,res)=>{
    let sampleFile = req.files.csvfile;
    sampleFile.mv(__dirname+'/uploadCSV/'+sampleFile.name).then(function () {
        let filePath=path.resolve(__dirname,'uploadCSV',sampleFile.name)
        filePath=filePath.replace(/\\/g,'/')
        let query=`LOAD DATA INFILE '${filePath}' 
                        INTO TABLE product 
                        FIELDS TERMINATED BY ',' 
                        ENCLOSED BY '"'
                        LINES TERMINATED BY '\\n'
                        IGNORE 1 ROWS;`
        con.query(query,(err,result)=>{
            if(err)
            {res.send("Error in executing MySQL query");}
            if(result)
            {res.send(result)}
        })
    })
};
//csv upload file for backend
exports.csvProductFile=(req,res)=>{
    let sampleFile = req.files.csvfile;
    sampleFile.mv(__dirname+'/uploadCSV/'+sampleFile.name).then(function () {
        let filePath=path.resolve(__dirname,'uploadCSV',sampleFile.name)
        filePath=filePath.replace(/\\/g,'/')
            let query=`LOAD DATA INFILE '${filePath}' 
                        INTO TABLE product 
                        FIELDS TERMINATED BY ',' 
                        ENCLOSED BY '"'
                        LINES TERMINATED BY '\\n'
                        IGNORE 1 ROWS;`
            con.query(query,(err,result)=>{
                if(err)
                {res.send("Error in executing MySQL query");}
                if(result)
                {res.send(result)}
            })
    })
};