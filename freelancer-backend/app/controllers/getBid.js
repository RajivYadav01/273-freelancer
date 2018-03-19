var pool = require('./pool.js');
var mysql = require('mysql');

module.exports.getBid = function(req,res,next){
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    //var email = req.body.userID;
    
    console.log("Inside Users");
    console.log("Request Body inside getBid : ", req.body);
    
    pool.getConnection(function(err,con)  {
        
        if (err) throw err;
        console.log("Connected!");
       
        var sql = "SELECT * FROM projectdetails WHERE pID = " + mysql.escape(req.params.pid);
        con.query(sql,function (err, result) {
            if (err) throw err;
                console.log("Record Selected");
                console.log("Result : " , result);
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                
                const resData = {
                    projects : result
                }
            
            res.end(JSON.stringify(resData));
            con.release();
            });
    });
    
  
};