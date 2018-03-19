const multer = require('multer');
const uuidv4 = require('uuidv4');
const path = require('path');
var pool = require('./pool.js');
const imagesUpload = require('images-upload-middleware');
var fs = require('fs');

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
        destination: 'public/pImage',
        filename: function (req, file, cb) {
           console.log("req inside" + req.body.userID); 
           cb(null, req.body.userID + path.extname(file.originalname))
        }
    });
    // create the multer instance that will be used to upload/save the file
    const upload = multer({ storage }).single('iFile');
module.exports.sImg = multer({ storage }).single('iFile');;    

module.exports.saveImg = function (req, res) {
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
        console.log("req----", req.body.userID);
        var sql = "UPDATE usersignup SET imagePath=? WHERE userID=?";
        var imgPath = req.body.userID + path.extname(req.file.originalname);
        var values = [imgPath, req.body.userID];
        con.query(sql,values, function (err, result) {
        if (err) throw err;
            console.log("imagePath inserted");
        });
        con.release();
        
    });
      
      //console.log("req",req);
    res.send();
  };

module.exports.loadImg = function(req, res){
    console.log("download-----",req.body);
    var filename = req.body.pID; 
    pool.getConnection(function(err,con)  {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT imagePath FROM usersignup WHERE userID = " + pool.escape(req.body.userID);
        console.log("sql----" + sql);
        con.query(sql,function (err, result) {
            console.log("Resilt from load Image : ",result);
            if (!result[0].imagePath)
            {
                res.end();
            }
            else{
                console.log("Record Found");
                console.log("Request : " , req.body);
                console.log("Query Result : ",  result[0].imagePath);
                var file = path.join(__dirname,'..','..','public','pImage')  + '\\' + result[0].imagePath;//dramaticpenguin.MOV;

                var content = result[0].imagePath.replace(req.body.userID+".", "");
                var img = fs.readFileSync(file);
                var base64img = new Buffer(img).toString('base64');
                res.writeHead(200, {'Content-Type': 'image/'+content });
                //res.sendFile(path.resolve(__dirname,'..','..','public','pImage',result[0].imagePath));
                res.end(base64img); 
            }
            
        });
        con.release();
    });
};