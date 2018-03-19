var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

/*describe("Signin", function(){
	it("Should validate credentials and should return 200 status", function(done){
		chai.request('http://127.0.0.1:8900')
  .post('/signin')
  .send({ "email": "rajiv.yadav362@gmail.com", "password": "rajivyadav" })
  .end(function (err, res) {
     expect(res).to.have.status(200);
	 done();
  });
	});
});*/


/*describe("Signup", function(){
	it("Should Insert record into user Table and should return 200 status", function(done){
		chai.request('http://127.0.0.1:8900')
  .post('/signup')
  .send({ "email": "saurabh.band@gmail.com", "username" : "Saurabh Bandekal", "password": "saurabh", "userType" : "1" })
  .end(function (err, res) {
     expect(res).to.have.status(200);
	 done();
  });
	});
});*/


/*describe("Show Projects Posted", function(){
	it("Should return list of projects posted and should return 200 status", function(done){
		chai.request('http://127.0.0.1:8900')
  .post('/myProjects')
  .send({ "userID": "1"})
  .end(function (err, res) {
     expect(res).to.have.status(200);
	 done();
  });
	});
});*/

/*describe("Show Open Projects", function(){
	it("should return list of open project and should return 200 status", function(done){
		chai.request('http://127.0.0.1:8900')
  .post('/user')
  .send({ "userID": "2"})
  .end(function (err, res) {
     expect(res).to.have.status(200);
	 done();
  });
	});
});*/

/*describe("View  bid", function(){
	it("Should return all list of bids and should return 200 status", function(done){
		chai.request('http://127.0.0.1:8900')
  .post('/projectsBid')
  .send({ "userID": "2"})
  .end(function (err, res) {
     expect(res).to.have.status(200);
	 done();
  });
	});
});*/