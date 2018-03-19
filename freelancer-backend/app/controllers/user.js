var pool = require('./pool.js');
var mysql = require('mysql');

module.exports.user = function(req,res,next){
    console.log("Inside my Projects request");
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    //var email = req.body.userID;
    
    console.log("Inside Users");
    
    pool.getConnection(function(err,con)  {
        
        if (err) throw err;
        console.log("Connected!");
       
        var sql = "SELECT * FROM projectDetails LEFT OUTER JOIN usersignup ON projectDetails.userID=usersignup.userID LEFT OUTER JOIN bids ON projectDetails.pid =bids.pid WHERE projectDetails.status='open' GROUP BY projectDetails.pid";
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