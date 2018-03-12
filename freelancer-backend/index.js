var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'nodeUser',
    password : 'nodeUser',
    database : 'nodedb'
});

var enclodedUrl = bodyParser.urlencoded({extended : false});

app.use(cookieParser());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin","http://localhost:3000");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Allow-Methods","HEAD, GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    res.header("Content-Type", "application/json");
  next();
});


app.post('/signup',enclodedUrl,function(req,res,next){
    console.log("Inside SignUp Recieved");
    Object.keys(req.body).forEach(function(key){
        req.body = JSON.parse(key);
    });
    
    var uname = req.body.username;
    var pass = req.body.password;
    var email = req.body.email;
    var userType = req.body.userType;
    pool.getConnection(function(err,con) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO usersignup (userName,Email,Password) VALUES (?)";
        var values = [uname,email,pass];
        con.query(sql,[values], function (err, result) {
        if (err) throw err;
            console.log("Record inserted");
        });
        con.release();
    });
    
    console.log("Request : " , req.body);
    res.writeHead(200,{
        'Content-Type' : 'text/plain'
    })
    const resData = {
        token : 'Token',
        id : 100,
        error : 'error'
    }
    
    res.end(JSON.stringify(resData));
    
});


app.post('/signin',enclodedUrl,function(req,res,next){
    console.log("Iniside Sign In Recieved");
    Object.keys(req.body).forEach(function(key){
        req.body = JSON.parse(key);
    });
    var email = req.body.email;
    var pass = req.body.password;
    var resData;
    console.log("Requst Body : ",req.body);
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
                /*res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })*/
                
                console.log("Response Data Sent : ",resData);
                res.end(JSON.stringify(resData));
            }
            else{
                console.log("Record",result[0].userID);
                resData = result[0].userID;
                console.log("Response after sql : " + resData);
                con.release();
                /*res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })*/
                res.cookie('myCookie','ABCD', { maxAge: 900000, httpOnly: false });
                console.log("Response Data Sent : ",resData);
                res.end(JSON.stringify(resData));
            }
        });
        
    });
    
    /*console.log("Request : " , req.body);
    res.writeHead(200,{
        'Content-Type' : 'text/plain'
    })
    
    console.log("Response Data Sent : ",resData);
    res.end(JSON.stringify(resData));*/
});

app.post('/myProjects',enclodedUrl,function(req,res,next){
    console.log("Inside my Projects request");
    /*Object.keys(req.body).forEach(function(key){
        req.body = JSON.parse(key);
    });
    var email = req.body.email;
    var pass = req.body.password;
    */
    
    pool.getConnection(function(err,con)  {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT *  FROM projectstable WHERE userID = 1";
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
    
  
});



app.post('/ShowProject',enclodedUrl,function(req,res,next){
    console.log("Inside Profile Recieved");
    /*Object.keys(req.body).forEach(function(key){
        req.body = JSON.parse(key);
    });
    var id = req.body.id;*/
    //var pass = req.body.password;
    
    
    pool.getConnection(function(err,con)  {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT   FROM usersignup WHERE userID = 1";
        con.query(sql,function (err, result) {
        if (err) throw err;
            console.log("Record Selected");
        });
        con.release();
    });
    
    console.log("Request : " , req.body);
    res.writeHead(200,{
        'Content-Type' : 'text/plain'
    })
    const resData = {
        name : 'Rajiv Yadav',
        id : 1,
        error : 'error'
    }
    
    res.end(JSON.stringify(resData));
});

app.post('/profile',enclodedUrl,function(req,res,next){
    console.log("Inside Profile Recieved");
    Object.keys(req.body).forEach(function(key){
        req.body = JSON.parse(key);
    });
    console.log("Cookie Values : ",req);
    var id = 3;
    //console.log("ID details : " + id);
    //var pass = req.body.password;
    
    
    pool.getConnection(function(err,con)  {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT *  FROM userdetails WHERE userID = "+ mysql.escape(id);
        con.query(sql,function (err, result) {
        if (err) throw err;
            console.log("Record Selected");
            console.log("Request : " , req.body);
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            console.log("Result", result);
            const resData = {
                name : result[0].name,
                designation : result[0].designation,
                aboutMe : result[0].aboutMe,
                skills : result[0].skills,
                email : result[0].email,
                phoneNumber : result[0].phoneNumber
            }
        console.log("Response Sent : ",resData);
        res.end(JSON.stringify(resData));
        con.release();
        });
        
    });
    
    
});

app.listen(1500);