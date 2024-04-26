
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

let server = "http://api.bmw.rallyemotorcompany.onlinekars.com:8000"; // Replace with the path to your server file

const expect = chai.expect;
chai.use(chaiHttp);

describe('User Profile information Fetch API', () => {
    let authToken3; // This will hold the authentication token obtained during login

    // Before running the tests, login and obtain the authentication token
    before((done) => {
        const credentials = {
            email: 'testbctdev655@gmail.com',
            password: '1234567',
            reCaptchaToken: ""
        };

        chai.request(server)
            .post('/visitor/login')
            .send(credentials)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                authToken3 = res.body.token; // Store the authentication token
                done();
            });
    });

    // Test case: Fetch the user's profile using the authentication token
    it('should fetch the user\'s profile', (done) => {
        chai.request(server)
            .get('/visitor/details')
            .set('Authorization', `Bearer ${authToken3}`)
            .set('Accept', 'application/json') 
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                //console.log(res.body);
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('statusCode', 200);
                expect(res.body).to.have.property('message', 'Bidder details fetched succesfully.');
                // Add more assertions based on your API response structure

                done();
            });
    });
});

describe('Update User Profile with Random Parameters', () => {
    let authToken4; // Store the authentication token
    //let initialProfile; // Store the initial user profile data

    before((done) => {
        // Perform login to obtain authentication token
        const credentials = {
            email: 'testbctdev655@gmail.com',
            password: '1234567',
            reCaptchaToken: ""
        };

        chai.request(server)
            .post('/visitor/login')
            .send(credentials)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                authToken4 = res.body.token; // Store the authentication token
                done();
            });
    });

    it('should update user profile with random parameters', (done) => {
        // Step 1: Retrieve user profile data
        chai.request(server)
            .get('/visitor/details')
            .set('Authorization', `Bearer ${authToken4}`)
            .set('Accept', 'application/json') 
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                initialProfile = res.body.profile;

                // Step 2: Generate random parameters for update
                const randomFirstName = faker.name.firstName();
                const randomLastName = faker.name.lastName();
                const randomAge = faker.datatype.number({ min: 0, max: 200 });
                const randomAdditionalEmail = faker.internet.email();
                const randomUsaMobileNumber = `(${faker.datatype.number({ min: 200, max: 999 })}) ` +
                    `${faker.datatype.number({ min: 200, max: 999 })}-${faker.datatype.number({ min: 1000, max: 9999 })}`;
                const randomAddress1 = faker.address.streetAddress();
                const randomAddress2 = faker.address.streetAddress();
                const randomGender = faker.random.arrayElement(['male', 'female', 'other']);
                const randomOccupation = faker.name.jobTitle();
                const randomCompanyName = faker.company.companyName();
                const randomUsaLicenseNumber = `${faker.random.alpha({ count: 1, upcase: true })}${faker.random.alpha({ count: 1, upcase: true })}${faker.datatype.number({ min: 1000, max: 9999 })}${faker.datatype.number({ min: 1000, max: 9999 })}`;
                //const randomLicenseExpirationDate = addYears(new Date(), faker.datatype.number({ min: 1, max: 2 }));
                //const formattedLicenseExpiration = format(randomLicenseExpirationDate, 'MM/dd/yyyy');
                const randomSimpleInterests = Array.from({ length: 3 }, () => faker.random.word());
                //const interestsWithoutQuotes = randomSimpleInterests.map(interest => interest.replace(/'/g, ''));


            



                // Step 3: Update user profile with random parameters
                const updatedProfile = {
                    visitor_first_name: randomFirstName,
                   visitor_last_name: randomLastName,
                    visitor_age: randomAge,
                    other_email: randomAdditionalEmail,
                    visitor_whatsapp: randomUsaMobileNumber,
                    visitor_address1: randomAddress1,
                    visitor_address2: randomAddress2,
                    visitor_gender: randomGender,
                    visitor_occupation: randomOccupation,
                    visitor_company_name: randomCompanyName,
                    visitor_lincense: randomUsaLicenseNumber,
                    //visitor_lincense_expiry: formattedLicenseExpiration,
                   // visitor_special_interest: interestsWithoutQuotes.join(', ')
    
                    // Include other fields if needed
                };

                chai.request(server)
                    .post('/visitor/update')
                    .set('Authorization', `Bearer ${authToken4}`)
                    .send(updatedProfile)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').to.equal('Bidder profile updated successfully.');


                        done();
                        console.log('Payload Data:', updatedProfile); //logs the payload data
                    });
            });
    });
});
