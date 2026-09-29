import {test, expect} from '@playwright/test';

//Website : https://restful-booker.herokuapp.com/apidoc/index.html

test('Get booking details by ID-path param', async({request})=>{

    //We can get this as path parameter
    const bookingID = 268;

    //Sending get request with path parameter
    const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`);

    const responseBody = await response.json();
    console.log(responseBody);

    //Verify Status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
})

test('Get booking details by Name- query param', async({request})=>{

    //We can get this as path parameter
    const firstName = "Mille";
    const lastName = "Chris";

    //Sending get request with path parameter
    const response = await request.get(`https://restful-booker.herokuapp.com/booking?firstname=${firstName}&lastname=${lastName}`);
    // const response = await request.get("https://restful-booker.herokuapp.com/booking", {
    //     params:{
    //         firstName,
    //         lastName
    //     }
    // });

    const responseBody = await response.json();
    console.log(responseBody);

    //Verify Status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //Verify responseBody
    expect(responseBody.length).toBeGreaterThan(0);

    for(const item of responseBody){
        //Check for the bookingID property
        expect(item).toHaveProperty('bookingid');
        //Check bookingID value is a number
        expect(typeof item.bookingid).toBe("number");
        //Check at least one booking ID exists
        expect(item.bookingid).toBeGreaterThan(0);
    }
})