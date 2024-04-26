const chai = require('chai');
const chaiHttp = require('chai-http');
const moment = require('moment-timezone');

const server = "http://api.bmw.rallyemotorcompany.onlinekars.com:8000";
//const server = "https://api.bmw.rallyemotorcompany.onlinekars.com:4043";


const expect = chai.expect;
chai.use(chaiHttp);

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

describe('Login and Place Multiple Bids with Predefined Users', () => {
    const users = [
        { email: 'rahul.gupta@bluecoppertech.com', password: '1234567', reCaptchaToken: "", timezone: 'America/New_York' },
        { email: 'rishav.verma@bluecoppertech.com', password: '123456789', reCaptchaToken: "", timezone: 'Europe/London' },
        { email: 'testbctdev655@gmail.com', password: '1234567', reCaptchaToken: "", timezone: 'Asia/Tokyo' }
        // Add more user objects as needed with their respective timezones
    ];
    

    const numBids = 1; // Total number of bids to place

    before(async() => {
        // Perform login for each user to obtain authentication tokens
        for (const user of users) {
            const res = await chai.request(server)
                .post('/visitor/login')
                .send(user);

            user.token = res.body.token; // Store the authentication token with the user
        }
    });

    it('should fetch catalog, find item at random, and place multiple bids from multiple users', async() => {
        const catalogPayload = {
            lotsPerPage: 12,
            page: 1,
            isFavorite: false,
            dealerId: 6,
            searchParam: null,
            extColor: null,
            carModel: null,
            make: null,
            year: null
        };

        for (let bidNumber = 1; bidNumber <= numBids; bidNumber++) {
            const randomUserIndex = getRandomIndex(users.length);
            const randomUser = users[randomUserIndex];

            try {

                     // Set the user's timezone
                    const userTimezone = randomUser.timezone;
                    moment.tz.setDefault(userTimezone);
                    

                    const bidTimestamp = moment(); // Record the bid timestamp in the user's timezone
        
                const catalogResponse = await chai.request(server)
                    .post('/visitor/catalog')
                    .set('Authorization', `Bearer ${randomUser.token}`)
                    .send(catalogPayload);

                if (!catalogResponse.body || !catalogResponse.body.data || !catalogResponse.body.data.data) {
                    console.error('Catalog response structure is not as expected.');
                    console.error('Actual Response:', catalogResponse.body); // Log the actual response
                    if (catalogResponse.body.message === 'Authorization Token not found') {
                        console.error(`Authentication failed for user: ${randomUser.email}`);
                    }
                    return; // Skip this iteration and move to the next bid
                }
                
                
                const catalogItems = catalogResponse.body.data.data;
                const randomIndex = getRandomIndex(catalogItems.length);
                const randomItem = catalogItems[randomIndex];
                const itemIdToBid = randomItem.itemId;
                const stockNumber = randomItem.itemSuk;
                const bidPrice = randomItem.biddingPrice;
                const incrementPrice = 60;
                const bidAmount = parseFloat(bidPrice) + incrementPrice;

                const bidPayload = {
                    itemId: itemIdToBid,
                    biddingPrice: bidAmount,
                    isFavorite: 1
                };

                const bidResponse = await chai.request(server)
                    .post('/visitor/bidForItem')
                    .set('Authorization', `Bearer ${randomUser.token}`)
                    .send(bidPayload);

                expect(bidResponse).to.have.status(200);
                expect(bidResponse.body).to.have.property('message').to.equal('Bid Successful');
                console.log(`Bid Number: ${bidNumber}`);
                console.log('Stock Number:', stockNumber);
                console.log('User:', randomUser.email);
                console.log('Payload Data:', bidPayload);
                //console.log('Bid Timestamp (in UTC):', bidTimestamp.utc().format()); // Convert to UTC and log
                console.log('Bid Timestamp (in User\'s Timezone): ', bidTimestamp.format());
                console.log('User Timezone:', userTimezone);
                
            } 
            catch (error) {
                console.error('An error occurred:', error.message);

            }
        }
    });
});