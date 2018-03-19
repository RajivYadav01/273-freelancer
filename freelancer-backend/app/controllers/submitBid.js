var pool = require('./pool.js');
var mysql = require('mysql');

module.exports.submitBid = function(req,res,next){
    let pid=req.params.pid;
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    var oid = req.body.oid;
    var eid=req.body.eid;
    var time=req.body.time+" days";
    var bidAmt=req.body.total;

    var count=0;
    pool.getConnection(function(err,con)  {
        if(err) throw err

        var sql = "INSERT INTO bids (eid,oid,deliverydays, bidAmt, pid) VALUES (?)";
        //  var sql1="UPDATE projectDetails SET bids=bids+1 WHERE pid="+mysql.escape(pid);
        var values = [eid,oid,time,bidAmt,pid];
        con.query(sql,[values], function (err, result) {
            if (err) throw err;
            console.log("Record inserted");
            
            var sql1="UPDATE projectdetails SET bids=bids+1, totalBid=totalBid+"+mysql.escape(bidAmt)+" WHERE pid="+mysql.escape(pid);
            con.query(sql1,function (err, result) {
                
                con.release();
            });
            
        });
    })
}