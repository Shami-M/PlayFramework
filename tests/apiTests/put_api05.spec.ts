/**
 * Website : https://restful-booker.herokuapp.com/apidoc/index.html
 * Pre-requisites:
 * data: json file
 * create token
 * 
 * Create a booking (POST) ---->bookigID
 * Create a token
 * Update Booking (PUT) // Need the token
 */
import {test,expect} from '@playwright/test';
import fs from 'fs';

//utility function returns json file data
function readJson(filePath:string){
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Update Booking(PUT)', async({request})=>{

    //--------------------------------- 1) Create a booking
    const requestBody = readJson('testdata/post_request_body.json');
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {data:requestBody});    

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    //Extract the booking id
    const bookingId = responseBody.bookingid;
    console.log("Booking ID ---> ", bookingId);

    //---------------------------------- 2) Create the token
    const requestBodyForToken = readJson('testdata/token_request_body.json');
    const responseOfToken = await request.post('https://restful-booker.herokuapp.com/auth', {data:requestBodyForToken});

    //Validate request is successful
    expect(responseOfToken.ok()).toBeTruthy();

    const responseOfTokenBody = await responseOfToken.json();
    const tokenValue = responseOfTokenBody.token;
    console.log("Token ---> ", tokenValue);

    //---------------------------------- 3) Update user details
    const resquestBodyForUpdate = readJson('testdata/put_request_body.json')
    const responseForUpdate = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
                                                 {data:resquestBodyForUpdate,
                                                  headers:{"Cookie": `token=${tokenValue}`}
                                                 });

    //Validate the response
    expect(responseForUpdate.ok()).toBeTruthy();
    expect(responseForUpdate.status()).toBe(200);

    const resposeForUpdateBody = await responseForUpdate.json();
    console.log(resposeForUpdateBody);
    console.log("Booking details updated successfully.")

    //Validate the response body
    expect(resposeForUpdateBody).toMatchObject({
        firstname: resquestBodyForUpdate.firstname,
        lastname: resquestBodyForUpdate.lastname,
        totalprice: resquestBodyForUpdate.totalprice,
        depositpaid: resquestBodyForUpdate.depositpaid,
        additionalneeds: resquestBodyForUpdate.additionalneeds
    });

    // //validate Booking details
    // const booking = responseForUpdate.bookingdates;
    // expect(resposeForUpdateBody).toMatchObject({
    //     checkin:
    //     checkout:
    // })
    
    

    



})
