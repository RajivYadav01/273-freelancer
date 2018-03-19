var pool = require('./pool.js');
var mysql = require('mysql');

module.exports.signIn = function(req,res,next){
    console.log("Iniside Sign In Recieved");
    Object.keys(req.body).forEach(function(key){
        req.body = JSON.parse(key);
    });
    var email = req.body.email;
    var pass = req.body.password;
    var resData;
    
    pool.getConnection(function(err,con)  {
        
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT *  FROM usersignup WHERE email = " + mysql.escape(email) + "and Password = " + mysql.escape(pass);
        var values = [email,pass];
        con.query(sql,function (err, result) {
        if (err) throw err;
            console.log("Record Found", result.length);
            if(result.length == 0){
                console.log("Inside Length Zero");
                 resData = null;
                con.release();
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
    
                console.log("Response Data Sent : ",resData);
                res.end(JSON.stringify(resData));
            }
            else{
                console.log("Record",result[0].userID);
                req.session.userID = result[0].userID;
                console.log("Response after sql : " + req.session.userID);
                con.release();
                res.cookie('cookie',req.session.userID,{maxAge: 900000, httpOnly: false});
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
    
                console.log("Response Data Sent : ",resData);
                res.end(JSON.stringify(result[0].userID));
            }
        });
        
    });
    
    /*console.log("Request : " , req.body);
    res.writeHead(200,{
        'Content-Type' : 'text/plain'
    })
    
    console.log("Response Data Sent : ",resData);
    res.end(JSON.stringify(resData));*/
};