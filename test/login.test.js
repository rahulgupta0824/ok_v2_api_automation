// Required dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

let server = "http://api.bmw.rallyemotorcompany.onlinekars.com:8000"; // Replace with the path to your Express server file

const expect = chai.expect;
chai.use(chaiHttp);

describe('Login API Email Field Validation for invalid email formats', () => {
    // Test case: Attempt to register with an invalid email format
    it('should return an error for invalid email format', (done) => {
        const invalidEmails = [
            '@domain.com',
            'test@',
            'test@@domain.com',
            'test@doma!n.com',
            '.test@doamin.com',
            'test@domain.com.',
            'test@domain..com'
        ];

        const registrationRequests = invalidEmails.map(email => {
            return chai.request(server)
                .post('/visitor/login')
                .send({
                    email: email,
                    password: 'hydr0g3n',
                    reCaptchaToken: ""
                })
                .then((res) => {
                    expect(res).to.have.status(403);
                    expect(res.body).to.have.property('message').to.equal('The email must be a valid email address.');
                });
        });

        Promise.all(registrationRequests)
            .then(() => done())
            .catch(done);
    });
});

describe('Login API test scenarios', () => {
    it('should return a successful response with the expected data', (done) => {
        chai.request(server)
            .post('/visitor/login')
            .send({
                email: 'testbctdev655@gmail.com',
                password: '1234567',
                reCaptchaToken: ""
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').to.equal('success');
                expect(res.body).to.have.property('token').to.be.a('string');
                done();
            });
    });
    it('should return an error for invalid credentials', (done) => {

        const newUser = {
            email: faker.internet.email(), // Generate a random valid email address
            password: faker.internet.password(), //Generate a random password
            reCaptchaToken: ""

        };


        chai.request(server)
            .post('/visitor/login')
            .send(newUser)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                expect(res).to.have.status(403);
                expect(res.body).to.have.property('statusCode').to.equal(403);
                expect(res.body).to.have.property('message').to.equal('Please provide correct credentials to login');
                done();

                //console.log(res.body); //logs the response
                //console.log('Payload Data:', newUser); //logs the payload data
            });


    });

    it('should return an error for Blank credentials', (done) => {

        chai.request(server)
            .post('/visitor/login')
            .send({
                email: '',
                password: '',
                reCaptchaToken: ""
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                //console.log(res.body);
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('statusCode').to.equal(403);
                expect(res.body).to.have.property('message').to.equal('The email field is required.');
                done();
            });


    });
    it('should return an error for missing email', (done) => {
        chai.request(server)
            .post('/visitor/login')
            .send({
                email: '',
                password: '1234567',
                reCaptchaToken: ""
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                expect(res).to.have.status(403);
                expect(res.body).to.have.property('statusCode').to.equal(403);
                expect(res.body).to.have.property('message').to.equal('The email field is required.');
                done();
            });
    });
    it('should return an error for missing password', (done) => {
        chai.request(server)
            .post('/visitor/login')
            .send({
                email: 'rahul.gupta@bluecoppertech.com',
                password: '',
                reCaptchaToken: ""
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                expect(res).to.have.status(403);
                expect(res.body).to.have.property('statusCode').to.equal(403);
                expect(res.body).to.have.property('message').to.equal('The password field is required.');
                done();
            });
    });
    it('should return an error for not approved accounts', (done) => {
        chai.request(server)
            .post('/visitor/login')
            .send({
                email: 'testbctdev400@gmail.com',
                password: '1234567',
                reCaptchaToken: ""
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                expect(res).to.have.status(599);
                expect(res.body).to.have.property('statusCode').to.equal(599);
                expect(res.body).to.have.property('message').to.equal('Your account is not approved, please check with site administrator.');
                done();
            });
    });
    it('should handle concurrent login requests gracefully for 2 different users', (done) => {
        const users = [
            { email: 'rahul.gupta@bluecoppertech.com', password: '1234567', reCaptchaToken: '' },
            { email: 'rishav.verma@bluecoppertech.com', password: '1234567', reCaptchaToken: '' }
        ];

        const loginRequests = users.map(user => {
            return chai.request(server)
                .post('/visitor/login')
                .send(user) // Send the current user object as the request payload
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status').to.equal('success');
                    expect(res.body).to.have.property('token').to.be.a('string');
                    //console.log(res.body);
                    //console.log('Payload Data:', user);
                });
        });

        Promise.all(loginRequests)
            .then(() => done())
            .catch(done);
    });
    it('should handle concurrent login requests from the same user gracefully(3 times)', (done) => {
        const user = { email: 'rahul.gupta@bluecoppertech.com', password: '1234567', reCaptchaToken: '' };

        const numConcurrentRequests = 3;
        const loginRequests = Array.from({ length: numConcurrentRequests }, () => {
            return chai.request(server)
                .post('/visitor/login')
                .send(user)
                .then((res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status').to.equal('success');
                    expect(res.body).to.have.property('token').to.be.a('string');
                });
        });

        Promise.all(loginRequests)
            .then(() => done())
            .catch(done);
    });
    // Rest of your test cases...
});
describe('Login and Logout API by passing authorization token', () => {
    let authToken; // Variable to store the authorization token

    before((done) => {
        // Make a login request to obtain the authorization token
        chai.request(server)
            .post('/visitor/login')
            .send({
                email: 'rahul.gupta@bluecoppertech.com',
                password: '1234567',
                reCaptchaToken: ''
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').to.equal('success');
                expect(res.body).to.have.property('token').to.be.a('string');

                // Capture the authorization token
                authToken = res.body.token;
                done();
            });
    });

    it('should successfully logout with the authorization token', (done) => {
        chai.request(server)

        .post('/visitor/logout')
            .set('Authorization', `Bearer ${authToken}`)
            .send()
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                //console.log(res.body);

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').to.equal('Visitor successfully signed out.');
                done();
            });
    });
});
describe('Change Password API', () => {
    let authToken2; // Variable to store the authorization token

    before((done) => {
        // Make a login request to obtain the authorization token
        chai.request(server)
            .post('/visitor/login')
            .send({
                email: 'rishav.verma@bluecoppertech.com',
                password: '123456789',
                reCaptchaToken: ''
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').to.equal('success');
                expect(res.body).to.have.property('token').to.be.a('string');

                // Capture the authorization token
                authToken2 = res.body.token;
                done();
            });
    });

    xit('should change the user password', (done) => {
        const password = '123456789';
        const confirm_password = '123456789';

        chai.request(server)
            .post('/visitor/changePassword')
            .set('Authorization', `Bearer ${authToken2}`)
            .send({ password })
            .send({ confirm_password })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').to.equal('Visitor password updated successfully.');
                done();
            });
    });


});