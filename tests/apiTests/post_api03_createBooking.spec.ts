/*
Website to be used : https://restful-booker.herokuapp.com/apidoc/index.html
Test: Create Booking
Request Type: POST
Request Body: random/dynamic data(faker)

Pre-requistes:
Install fake-js library for generating dynamic data
npm install @faker-js/faker

Install Luxon is a library for working with dates and times in JavaScript
npm install Luxon
*/

import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {DateTime} from 'luxon';

test('Create Post request using json file body', async({request})=>{

    //Data generation
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalprice = faker.number.int({min:100, max:5000});
    const depositpaid = faker.datatype.boolean();

    const checkinDate = DateTime.now().toFormat('yyyy-MM-dd');
    const checkoutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd');

    const additionalneeds = "Super";

    //Request Body(faker)
    const requestBody = {
        firstname: firstname,
        lastname: lastname,
        totalprice: totalprice,
        depositpaid: depositpaid,
        bookingdates: {
            checkin: checkinDate,
            checkout: checkoutDate
        },
        additionalneeds: additionalneeds
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