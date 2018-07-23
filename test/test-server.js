var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./server');
var mongoose = require('./services/mongoose')

//here goes models -> ¿Can go an model module and export all the 'models objects'?
var documentType = require('./models/documentType')
var user = require ('./models/user') 

var should = chai.should();
chai.use(chaiHttp);

//iT could be generic by implmentign model !
describe('documentType', function () {
	it('should list ALL documentType on /documentType GET', function (done) {
		chai.request(server)
		  .get('/documentType')
		  .end(function (err, res) {
		  	res.should.have.status(200);
		  	res.should.be.json;
		  	res.body.should.be.a('array');
		  	done();
		  });
	});
	it('should list a SINGLE documentType on /documentType/<id> GET', function (done) {
		chai.request(server)
		  .get('/documentType')
		  .end(function (err, res) {
		  	res.should.have.status(200);
		  	res.should.be.json;
		  	res.body.should.be.a('array');
		  	done();
		  });
	it('should add a SINGLE documentType on /documentType POST', function (done) {
			chai.request(server)
			  .post('/documentType')				
			  .send({ 'id': '01', 'reactionType': 'creation', 'title': 'firstDocument', 'description': 'Create a Type of Dcoument', 'public': 'true', 'fields': '', 'finishDate': '24/11/2010' })
			  .end(function (err, res) {
			  	res.should.have.status(200);
			  	res.should.be.json;
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('SUCCESS');
			  	res.body.SUCCESS.should.be.a('object');
			  	res.body.SUCCESS.should.have.property('id');
			  	res.body.SUCCESS.should.have.property('title');
			  	res.body.SUCCESS.should.have.property('description');
			  	res.body.SUCCESS.id.should.equal('01');
			  	res.body.SUCCESS.title.should.equal('firstDocument');
			  	done();
			  });
		});
	it('should update a SINGLE documentType on /documentType/<id> PUT', function (done) {
			chai.request(server)
			  .get('/documentType')
			  .end(function(err, res){
			  	chai.request(server)
				  .put('/documentType/' + res.body[0]._id)
				  .send({ 'id': '01', 'reactionType': 'creation', 'title': 'firstDocument', 'description': 'Create a Type of Dcoument', 'public': 'false', 'fields': '', 'finishDate': '24/11/2010' })
				  .end(function(error, response){
				  	response.should.have.status(200);
				  	response.should.be.json;
				  	response.body.should.be.a('object');
				  	response.body.should.have.property('UPDATED');
				  	response.body.UPDATED.should.be.a('object');
				  	response.body.UPDATED.should.have.property('public');
				  	response.body.UPDATED.should.have.property('id');
				  	response.body.UPDATED.public.should.equal('false');
				  	done();
				  });
			  });
		});
	it('should delete a SINGLE documentType on /documentType/<id> DELETE', function (done) {
			chai.request(server)
			  .get('/documentType')
			  .end(function(err, res){
			  	chai.request(server)
				  .delete('/documentType/' + res.body[0]._id)
				  .end(function(error, response){
				  	response.should.have.status(200);
				  	response.should.be.json;
				  	response.body.should.be.a('object');
				  	response.body.should.have.property('REMOVED');
				  	response.body.REMOVED.should.be.a('object');
				  	response.body.REMOVED.should.have.property('id');					  
				  	done();
				  });
			  });
		});
	});
})