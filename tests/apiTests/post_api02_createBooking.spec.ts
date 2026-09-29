/*
Website to be used : https://restful-booker.herokuapp.com/apidoc/index.html
Test: Create Booking
Request Type: POST
Request Body: External JSON File
*/

import {test, expect} from '@playwright/test';
import fs from 'fs';

test('Create Post request using json file body', async({request})=>{

    //Read the data from json(request body)
    const jsonFile = "testdata/post_request_body.json";
    const requestBody = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

    //Send post request
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {data:requestBody});

    //Extracted response body
    const responseBody = await response.json();
    console.log(responseBody);

    //Validate status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200)

    //Validate body
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking');
    expect(responseBody).toHaveProperty('booking.additionalneeds');

    //Validate booking details
    const booking = responseBody.booking;

    expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds
    })

    //Validate booking dates (nested json object)
    expect(booking.bookingdates).toMatchObject({
        checkin : requestBody.bookingdates.checkin,
        checkout : requestBody.bookingdates.checkout
    })

})