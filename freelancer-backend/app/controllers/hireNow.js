var pool = require('./pool.js');
var mysql = require('mysql');

module.exports.hireNow = function(req,res,next){
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    //var email = req.body.userID;
    
    console.log("Inside Users");
    console.log("Request Body inside getBid : ", req.body);
    
    pool.getConnection(function(err,con)  {
        
        if (err) throw err;
        console.log("Connected!");
       
        var sql = "UPDATE projectdetails set status = 'closed' WHERE pID = " + mysql.escape(req.body.pid);
        con.query(sql,function (err, result) {
            if (err) throw err;
                console.log("Record Selected");
                console.log("Result : " , result);
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })            
            res.end();
            con.release();
            });
    });
    
  
};