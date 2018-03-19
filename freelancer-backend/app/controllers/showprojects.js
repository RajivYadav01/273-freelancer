var pool = require('./pool.js');
var mysql = require('mysql');
const path = require('path');
var fs = require('fs');


module.exports.ShowProject = function(req,res,next){
    console.log("Inside showProject Recieved", req.body.pid);
    /*Object.keys(req.body).forEach(function(key){
        req.body = JSON.parse(key);
    });*/
    //var pass = req.body.password;
    
    
    /*pool.getConnection(function(err,con)  {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM projectdetails WHERE pID =" +mysql.escape(req.body.pid);
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
    
    res.end(JSON.stringify(resData));*/
    
    //console.log("Show Project Request ID Value : ",req.body);
    
    pool.getConnection(function(err,con)  {
        
        if (err) throw err;
        console.log("Connected!");
       
        var sql = "SELECT * FROM bids LEFT OUTER JOIN usersignup ON bids.eid = usersignup.userID WHERE bids.pid = " + mysql.escape(req.body.pid);
        con.query(sql,function (err, result) {
            if (err) throw err;
                console.log("Record Selected");
                console.log("Result : " , result);
                /*res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })*/
            result.map(rs =>{
                if (!rs.imagePath)
                {
                    //res.end();
                }
                else{
                    var file = path.join(__dirname,'..','..','public','pImage')  + '\\' + rs.imagePath;//dramaticpenguin.MOV;

                    var content = rs.imagePath.replace(req.body.userID+".", "");
                    var img = fs.readFileSync(file);
                    var base64img = new Buffer(img).toString('base64');
                    res.writeHead(200, {'Content-Type': 'image/'+content });
                    //res.sendFile(path.resolve(__dirname,'..','..','public','pImage',result[0].imagePath));
                    rs.imagePath = base64img; 
                }
            });
            
            const resData = {
                    bids : result
            }
            res.end(JSON.stringify(resData));
            con.release();
            });
    });
};