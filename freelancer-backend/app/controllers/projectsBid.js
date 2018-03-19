var pool = require('./pool.js');
var mysql = require('mysql');
module.exports.projectsBid = function(req,res,next){
    console.log("Inside my Projects request");
    /*Object.keys(req.body).forEach(function(key){
        req.body = JSON.parse(key);
    });
    var email = req.body.email;
    var pass = req.body.password;
    */
   console.log(req.body);
    pool.getConnection(function(err,con)  {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM projectdetails JOIN bids ON projectdetails.pID=bids.pid WHERE bids.eid= " + pool.escape(req.body.userID);
        console.log("sql----" + sql);
        con.query(sql,function (err, result) {
        if (err) throw err;
            console.log("Record Found");
            console.log("Request : " , req.body);
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            console.log("Query Result : " ,  result);
            /*const resData = {
                projectName : 'Design a Logo',
                bids : 100,
                myBid : '$25 USD',
                avgBid : '$20 USD',
                bidEndDate : '03/04/2018'
            }*/
            res.end(JSON.stringify(result));
        });
        con.release();
    });
    
  
};