var supertest = require('supertest');

describe('entrance/signup.login', function() {

  describe('#signup()', function() {
    it('should accept new user with test/test', function (done) {
      supertest(sails.hooks.http.app)
      .post('/api/v1/entrance/signup')
      .send({ username: 'test', password: 'test', fullName: 'Test Testerson' })
      .expect(200)
      .end(done);
    });
  });

  describe('#signup()', function() {
    it('should reject new user with existing username', function (done) {
      supertest(sails.hooks.http.app)
      .post('/api/v1/entrance/signup')
      .send({ username: 'test1', password: 'test', fullName: 'Test Testerson' })
      .end(() => 
        supertest(sails.hooks.http.app)
        .post('/api/v1/entrance/signup')
        .send({ username: 'test1', password: 'test', fullName: 'Test Testerson' })
        .expect(409)
        .end(done));
    });
  });

  describe('#signup()', function() {
    it('should reject new user with blank password', function (done) {
      supertest(sails.hooks.http.app)
      .post('/api/v1/entrance/signup')
      .send({ username: 'test3', password: '', fullName: 'Test Testerson' })
      .expect(400)
      .end(done);
    });
  });

});