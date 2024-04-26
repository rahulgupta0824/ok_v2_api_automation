const chai = require('chai');
const chaiHttp = require('chai-http');
const server = "https://api.rallyemotorcompany-stag.onlinekars.com:4043";

const expect = chai.expect;
chai.use(chaiHttp);

const agent = chai.request.agent(server);

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

describe('Login and Place Multiple Bids with Predefined Users', () => {
    const users = [
        { email: 'testbctokdev801@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev802@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev803@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev804@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev805@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev806@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev807@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev808@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev809@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev810@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev811@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev812@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev813@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev814@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testbctokdev815@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9001@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9002@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9003@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9004@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9005@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9006@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9007@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9008@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9009@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9010@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9011@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9012@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9013@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9014@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9015@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9016@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9017@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9018@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },
        { email: 'testmochabidder9019@yopmail.com', password: 'hydr0g3n', reCaptchaToken: "" },

       

        
        // Add more user objects as needed
    ];

    const numBids = 100;

    before(async () => {
        // Perform login for each user to obtain authentication tokens
        await Promise.all(users.map(async (user) => {
            const res = await agent.post('/visitor/login').send(user);
            user.token = res.body.token;
        }));
    });

    it('should fetch catalog, find item at random, and place multiple bids from multiple users', async () => {
        const catalogPayload = {
            lotsPerPage: 200,
            page: 1,
            isFavorite: false,
            dealerId: "",
            searchParam: null,
            extColor: null,
            carModel: null,
            make: null,
            year: null
        };

        const bidPromises = Array.from({ length: numBids }, () => placeBid(users, catalogPayload));

        await Promise.all(bidPromises);
    });

    async function placeBid(users, catalogPayload) {
        const randomUserIndex = getRandomIndex(users.length);
        const randomUser = users[randomUserIndex];

        try {
            const catalogResponse = await agent
                .post('/visitor/catalog')
                .set('Authorization', `Bearer ${randomUser.token}`)
                .send(catalogPayload);

            const catalogItems = catalogResponse.body.data.data;

            const randomIndex = getRandomIndex(catalogItems.length);
            const randomItem = catalogItems[randomIndex];

            const itemIdToBid = randomItem.itemId;
            const stockNumber = randomItem.itemSuk;
            const bidPrice = randomItem.biddingPrice;
            const hopping_price = randomItem.hoppingPrice;
            const bidAmount = parseFloat(bidPrice) + (parseFloat(hopping_price) * 100);

            const bidPayload = {
                itemId: itemIdToBid,
                biddingPrice: bidAmount
            };

            const bidResponse = await agent
                .post('/visitor/bidForItem')
                .set('Authorization', `Bearer ${randomUser.token}`)
                .send(bidPayload);

            expect(bidResponse).to.have.status(200);
            expect(bidResponse.body).to.have.property('message').to.equal('Bid Successful');
            console.log(`Bid Number: ${bidNumber}`);
            console.log('Stock Number:', stockNumber);
            console.log('Payload Data:', bidPayload);
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }
});
