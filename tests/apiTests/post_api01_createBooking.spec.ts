/*
Website to be used : https://restful-booker.herokuapp.com/apidoc/index.html
Test: Create Booking
Request Type: POST
Request Body: static
*/

import {test, expect} from '@playwright/test';

test('Create Post request using static body', async({request})=>{

    //Request Body
    const requestBody = {
        firstname: "Mille",
        lastname: "Chris",
        totalprice: 114,
        depositpaid: true,
        bookingdates: {
            checkin: "2020-01-01",
            checkout: "2020-02-01"
        },
        additionalneeds: "Lunch"
    }

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
        firstname: "Mille",
        lastname: "Chris",
        totalprice: 114,
        depositpaid: true,
        bookingdates: {
            checkin: "2020-01-01",
            checkout: "2020-02-01"
        },
        additionalneeds: "Lunch"
    })

    //Validate booking dates (nested json object)
    expect(booking.bookingdates).toMatchObject({
        checkin : "2020-01-01",
        checkout : "2020-02-01"
    })

})