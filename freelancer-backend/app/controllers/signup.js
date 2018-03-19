var pool = require('./pool.js');
var passport = require('passport');

module.exports.signUp = function(req,res,next){
    // passport.authenticate("local", function(err, user, info) {
        console.log("Inside SignUp Recieved");
        Object.keys(req.body).forEach(function(key){
            req.body = JSON.parse(key);
        });
        console.log(req.body);
        var uname = req.body.username;
        var pass = req.body.password;
        var email = req.body.email;
        var userType = req.body.userType;
        var userID;
        var sessionData = req.session;
        function getSQL(callback) {
            pool.getConnection(function(err,con) {
                if (err) throw err;
                console.log("Connected!");
                var sql = "INSERT INTO usersignup (userName,Email,Password) VALUES (?)";
                var values = [uname,email,pass];
                con.query(sql,[values], function (err, result) {
                if (err) throw err;
                    console.log("Record inserted");
                });
                con.query('SELECT LAST_INSERT_ID() as userID', function(error, results, fields) {
                    console.log("results",results[0]);
                    userID = results[0];
                    callback(null, results[0]);
                });
                con.release();
            });
        };
    
        var callback = function(err, result) {
            console.log("Request : " , result.userID);
            sessionData.userID = result.userID;
            res.cookie('cookie',sessionData.userID,{maxAge: 900000, httpOnly: true});
            res.writeHead(200,{
                // 'Set-Cookie' : sessionData.userID,
                'Content-Type' : 'text/plain'
            });
            
            res.end("Cookies Set");
        }
        getSQL(callback);
    // });
};


