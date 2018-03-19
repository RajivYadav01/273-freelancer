var express = require('express');
var router = express.Router();
var signin = require('../controllers/signin.js');
var signup = require('../controllers/signup.js');
var ShowProject = require('../controllers/showprojects.js');
var profile = require('../controllers/profile.js');
var myProjects = require('../controllers/myprojects.js');
var uploads = require('../controllers/uploads.js');
var user = require('../controllers/user.js');
var sImg = require('../controllers/saveImg.js');
var submitBid = require('../controllers/submitBid.js');
var getBid = require('../controllers/getBid.js');
var hireNow = require('../controllers/hireNow.js');
var projectsBid = require('../controllers/projectsBid.js');

router
    .route('/signup')
    .post(signup.signUp);
    
router
    .route('/signin')
    .post(signin.signIn);  
    
router
    .route('/myProjects')
    .post(myProjects.myProjects);    
    
router
    .route('/ShowProject')
    .post(ShowProject.ShowProject);     

router
    .route('/profile')
    .post(profile.profile); 
    
router
    .route('/user')
    .post(user.user);     

router
    .route('/uploads')
    .post(uploads.upload, uploads.uploads);  
    
router
    .route('/downloads')
    .post(uploads.downloads); 
    
router
    .route('/saveImage')
    .post(sImg.sImg, sImg.saveImg);   
    
router
    .route('/loadImage')
    .post(sImg.loadImg);   
    
router
    .route('/submitBid/:pid')
    .post(submitBid.submitBid);

router
    .route('/bid/:pid')
    .post(getBid.getBid);

router
    .route('/hireNow/')
    .post(hireNow.hireNow);

router
    .route('/projectsBid/')
    .post(projectsBid.projectsBid);

module.exports = router;