var pool = require('./pool.js');
var mysql = require('mysql');

module.exports.profile = function(req,res,next){
    console.log("Inside Profile Recieved");
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    var id = req.body.userID;
    console.log("ID details : " + id);
    console.log("req details : ", req);
    //var pass = req.body.password;
    
    
    pool.getConnection(function(err,con)  {
        if (err) throw err;
        console.log("Connected!");
        var sql, values;
        if(req.body.email === undefined) {
            sql = "SELECT *  FROM usersignup WHERE userID = ?";
            values = [id]; 
        }
        else {
            sql = "UPDATE usersignup SET aboutMe=?, designation=?, email=?, phoneNumber=?, skills=?, username=? WHERE userID=?"    
            values = [req.body.aboutMe, req.body.designation, req.body.email, req.body.phone, req.body.skills, req.body.username, id];
        }
        console.log("SQL PROFILE" + sql);
        con.query(sql,values,function (err, result) {
            if (err) throw err;
            console.log("Record Selected", result);
            console.log("Request : " , req.body);
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            console.log("Result", result);
            const resData = {
                name : (result[0] !== undefined) ?  result[0].userName: req.body.username,
                designation : (result[0] !== undefined) ?  result[0].designation: req.body.designation,
                aboutMe : (result[0] !== undefined) ?  result[0].aboutMe: req.body.aboutMe,
                skills : (result[0] !== undefined) ?  result[0].skills: req.body.skills,
                email : (result[0] !== undefined) ?  result[0].Email: req.body.Email,
                phoneNumber : (result[0] !== undefined) ?  result[0].phoneNumber: req.body.phone,
            }
        console.log("Response Sent : ",resData);
        res.end(JSON.stringify(resData));
        con.release();
        });
        
    });
    
    
};