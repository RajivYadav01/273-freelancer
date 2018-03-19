const multer = require('multer');
const uuidv4 = require('uuidv4');
const path = require('path');
var pool = require('./pool.js');

// configure storage
const storage = multer.diskStorage({
    //   destination: (req, file, cb) => {
    //     /*
    //       Files will be saved in the 'uploads' directory. Make
    //       sure this directory already exists!
    //     */
    //     cb(null, './public/uploads');
    //   },
    //   filename: (req, file, cb) => {
    //     /*
    //       uuidv4() will generate a random ID that we'll use for the
    //       new filename. We use path.extname() to get
    //       the extension from the original file name and add that to the new
    //       generated ID. These combined will create the file name used
    //       to save the file on the server and will be available as
    //       req.file.pathname in the router handler.
    //     */
    //     const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    //     cb(null, newFilename);
    //   },
        destination: 'public/uploads',
        filename: function (req, file, cb) {
           console.log("req inside" + req.userID); 
           cb(null, req.body.userID + path.extname(file.originalname))
        }
    });
    // create the multer instance that will be used to upload/save the file
    const upload = multer({ storage }).single('newfile');
module.exports.upload = multer({ storage }).single('newfile');;    

module.exports.uploads = function (req, res) {
    /*
      We now have a new req.file object here. At this point the file has been saved
      and the req.file.filename value will be the name returned by the
      filename() function defined in the diskStorage configuration. Other form fields
      are available here in req.body.
    */
  //  Object.keys(req.body).forEach(function(key){
  //     req.body = key
  //  })
      //req.file = req.body;
      pool.getConnection(function(err,con) {
        if (err) throw err;
        console.log("Connected!");
        // upload(req,res,function(err) {
        //     //console.log(req.file);
        //     if(err) {
        //         return console.log("Error uploading file.");
        //     }
        //     console.log("File is uploaded");
        //     res.status(200).end();
        //     //console.log("req",req);
        // });
        console.log("req----", req);
        var sql = "INSERT INTO projectdetails (userID, pName, Description, fileUplURL, skills, budgetRange, bidEndDate,status) VALUES (?)";
        var today = new Date();
        today.setDate(today.getDate() + 7);
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var insertDate = yyyy.toString()+'-'+mm.toString()+'-'+dd.toString()
        var values = [req.body.userID, req.body.pname, req.body.textlg, req.body.fupl, req.body.skills, req.body.drp2,req.body.status, insertDate];
        con.query(sql,[values], function (err, result) {
        if (err) throw err;
            console.log("Record inserted");
        });
        con.release();
        
    });
      
      //console.log("req",req);
    res.send();
  };

  module.exports.downloads = function(req, res){
      console.log("download-----",req.body);
    var filename = req.body.pID; 
    pool.getConnection(function(err,con)  {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT userid  FROM projectdetails WHERE pid = " + pool.escape(req.body.pid);
        console.log("sql----" + sql);
        con.query(sql,function (err, result) {
            if (err) throw err;
            console.log("Record Found");
            console.log("Request : " , req.body);
            console.log("Query Result : " +  result[0].userid);
            var file = path.join(__dirname,'..','..','public','uploads')  + '\\' + result[0].userid + path.extname(req.body.url);//dramaticpenguin.MOV;
            res.download(file); // Set disposition and send it.
            
        });
        con.release();
    });
  };