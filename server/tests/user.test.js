import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();
chai.use(chaiHttp);

const adminToken = process.env.Admin;

describe('testing sign up', () => {
  it('should validate the user', (done) => {
    const newUser = {
      email: 'hhhh@gmail.com',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should validate the user', (done) => {
    const newUser = {
      firstName: 'gggggg',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should validate the user', (done) => {
    const newUser = {
      email: 'gmail.com',
      firstName: 'gggggg',
      lastName: 'dhd',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should validate the user', (done) => {
    const newUser = {
      email: 'hhhh@gmail.com',
      password: 'nn',
      firstName: 'gggggg',
      lastName: 'dhd',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should validate the user', (done) => {
    const newUser = {
      email: 'hhhh@gmail.com',
      password: 'nnhduhduhdu',
      firstName: 'gggggg',
      lastName: 'dhd',
      passwordConfirm: 'duhdbgyg',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should return User created successfully', (done) => {
    const newUser = {
      email: 'james@gmail.com',
      password: 'james123',
      passwordConfirm: 'james123',
      firstName: 'james',
      lastName: 'bond',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should return email already exist', (done) => {
    const newUser = {
      email: 'gad@gmail.com',
      password: 'passssssss',
      firstName: 'Gad',
      lastName: 'Ishimwe',
      address: 'Nyarugenge',
      bio: 'uhfuif fihwiufhw fuwhfu ufhwufhu',
      occupation: 'Developer',
      expertise: 'Javascript',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(422);
      });
    done();
  });
});

describe('Testing sign in', () => {
  it('should return invalid email or password when user entered email with no existing account', (done) => {
    const invalidCredentials = {
      email: 'invalid@gmail.com',
      password: 'jieojf',
    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(invalidCredentials)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should return invalid email or password when user entered valid email but invalid password', (done) => {
    const user = {
      email: 'gad@gmail.com',
      password: 'jjj',
    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should return User is successfully logged in', (done) => {
    const user = {
      email: 'gad@gmail.com',
      password: 'gadish123',
    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});

describe('Testing Viewing all users', () => {
  it('should return status 200 with list of users in data property', (done) => {
    chai.request(app)
      .get('/api/v2/users')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
