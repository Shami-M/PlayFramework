import {test, expect} from '@playwright/test';
import fs from 'fs';

function readJsonFile(file:string){
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

test('Entire booking api practise', async({request})=>{
    
    //Create booking
    const bookingReqBody = readJsonFile('testdata/post_request_body.json');
    
    const createReqResponse = await request.post('https://restful-booker.herokuapp.com/booking', {data:bookingReqBody});
    //Validate status code
    expect(createReqResponse.status()).toBe(200);
    expect(createReqResponse.ok()).toBeTruthy();

    const createReqResponseBody = await createReqResponse.json();
    console.log(createReqResponseBody);

    const bookingID = createReqResponseBody.bookingid;
    console.log('Booking ID : ' + bookingID);
    //Validate Data Types 
    expect(typeof bookingID).toBe('number');
    //Validate JSON fields
    expect(createReqResponseBody.booking.firstname).toBe('Mille');
    expect(createReqResponseBody.booking.bookingdates.checkin).toContain('2020');

    //Create Token
    const tokenReqBody = readJsonFile('testdata/token_request_body.json');
    
    const tokenResponse = await request.post('https://restful-booker.herokuapp.com/auth', {data:tokenReqBody});
    expect(tokenResponse.ok()).toBeTruthy();
    expect(tokenResponse.status()).toBe(200);

    const tokenResponseBody = await tokenResponse.json();
    console.log(tokenResponseBody);

    const token = tokenResponseBody.token;
    console.log('Token value : ' + token);

    //Update booking details
    const updateReqBody = readJsonFile('testdata/put_request_body.json');
    
    const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingID}`, 
                                                {data:updateReqBody,
                                                 headers:{'Cookie': `token=${token}`}
                                                });
    expect(updateResponse.status()).toBe(200);
    
    const updateResponseBody = await updateResponse.json();
    console.log(updateResponseBody);
    //Validate Property Exists
    expect(updateResponseBody).toHaveProperty('firstname');

    //Validate Object Contains Expected Values
    const bookingDates = updateResponseBody.bookingdates;
    expect(bookingDates).toMatchObject({
        checkin: bookingDates.checkin,
        checkout: bookingDates.checkout
    })
    //Validate Entire JSON using toEqual
   // expect(body).toEqual({

    //Delete booking
    const deleteReq = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingID}`, {headers:{'Cookie': `token=${token}`}})
    expect(deleteReq).toBeTruthy();
    expect(deleteReq.status()).toBe(201);
    expect(deleteReq.statusText()).toBe('Created'); 

    console.log('****** Booking details delated successfully ******');

    //Try to get the deleted booking details
    const getBookingReq = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
    expect(getBookingReq.status()).toBe(404);

})