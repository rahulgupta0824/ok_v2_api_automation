const chai = require('chai');
const chaiHttp = require('chai-http');
const { cell_phone } = require('faker/lib/locales/ar');
//const server = "http://api.rallyemotorcompany-stag.onlinekars.com:8000";
//const server = "https://api.bmw.rallyemotorcompany.onlinekars.com:4043";
const server = "https://api.stg-rallyemotorcompany.onlinekars.com";

//let x=1;
const expect = chai.expect;
chai.use(chaiHttp);

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

describe('Login and Place Multiple Bids with Predefined Users', () => {
    const users = [
        { email: 'rahul.gupta+1@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+2@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+3@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+4@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+5@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+6@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+7@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+8@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+9@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+10@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+11@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+12@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+13@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+14@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+15@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+16@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+17@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+18@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+19@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+20@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+21@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+22@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+23@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+24@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+25@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+26@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+27@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+28@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+29@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+30@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+31@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+32@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+33@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+34@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+35@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+36@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+37@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+38@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+39@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+40@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+41@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+42@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+43@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+44@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+45@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+46@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+47@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+48@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+49@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    { email: 'rahul.gupta+50@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' }
    // { email: 'rahul.gupta+51@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+52@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+53@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+54@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+55@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+56@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+57@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+58@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+59@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+60@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+61@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+62@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+63@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+64@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+65@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+66@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+67@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+68@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+69@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+70@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+71@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+72@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+73@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+74@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+75@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+76@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+77@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+78@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+79@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+80@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+81@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+82@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+83@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+84@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+85@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+86@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+87@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+88@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+89@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+90@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+91@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+92@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+93@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+94@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+95@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+96@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+97@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+98@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+99@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' },
    // { email: 'rahul.gupta+100@bluecoppertech.com', password: 'hydr0g3n', reCaptchaToken: '' }
        
        ];

    const numBids = 2500; // Total number of bids to place
    
    
    before(async() => {
        
        // Perform login for each user to obtain authentication tokens
        for (const user of users) {
            const res = await chai.request(server)
                .post('/visitor/login')
                .send(user);
               // console.log('login', res.body);
            user.token = res.body.token; // Store the authentication token with the user
        }
    });

    it('should fetch catalog, find item at random, and place multiple bids from multiple users', async() => {
        const catalogPayload = {
            lotsPerPage: 50,
            page:1,
            isFavorite: false,
            dealerId:"",
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
                const catalogResponse = await chai.request(server)
                    .post('/visitor/catalog')
                    .set('Authorization', `Bearer ${randomUser.token}`)
                    //.send({ lotsPerPage: 12, page: 1 });
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
                //const lastPage=catalogResponse.body.data.total;
                
                //console.log('LP:', lastPage);
                //console.log('CatalogItems:', catalogItems);

                
            const randomIndex = getRandomIndex(catalogItems.length);
               // const randomIndex = getRandomIndex(lastPage);
                //console.log("ID:", getRandomIndex);
                //console.log('PTB:', randomIndex);
                const randomItem = catalogItems[randomIndex];
                
                const itemIdToBid = randomItem.itemId;
                
                
                //const itemIdToBid = 78518;
            
                const stockNumber = randomItem.itemSuk;
                const bidPrice = randomItem.biddingPrice;
                const hopping_price=randomItem.hoppingPrice;
               
                //const incrementPrice = 1000;
            
                const bidAmount = parseFloat(bidPrice) + (parseFloat(hopping_price)*10);

                const bidPayload = {
                    itemId: itemIdToBid,
                    biddingPrice: bidAmount
                   // hoppingPrice:hopping_price,
                    //isFavorite: 1,
                    
                };

                const bidResponse = await chai.request(server)
                    .post('/visitor/bidForItem')
                    .set('Authorization', `Bearer ${randomUser.token}`)
                    .send(bidPayload);

                expect(bidResponse).to.have.status(200);
                expect(bidResponse.body).to.have.property('message').to.equal('Bid Successful');
                console.log(`Bid Number: ${bidNumber}`);
               //console.log('CatalogItems:', catalogItems);
               //console.log('Cataloglength:', catalogItems.length);
               //console.log('CatalogItems:', randomIndex);
               //console.log('Catalogpload:', catalogPayload);
               console.log('Stock Number:', stockNumber);
               //console.log('User:', randomUser.email);
               console.log('Payload Data:', bidPayload);
            } catch (error) {
                console.error('An error occurred:', error.message);

            }
        }
    });
});
