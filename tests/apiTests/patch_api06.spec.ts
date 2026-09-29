import {test,expect} from '@playwright/test';
import fs from 'fs';

//Website : https://restful-booker.herokuapp.com/apidoc/index.html

function readJson(filePath:string){
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Update booking details partially', async({request})=>{

//--------------------------------------------- Create the booking
const requestBodyPOST = readJson('testdata/post_request_body.json');
const responsePOST = await request.post('https://restful-booker.herokuapp.com/booking', {data:requestBodyPOST});

const responseBodyPOST = await responsePOST.json();
console.log(responseBodyPOST);
//Extract booking id
const bookingID = responseBodyPOST.bookingid;
console.log('Booking ID -----------> ', bookingID);

//--------------------------------------------- Create token
const requestBodyToken = readJson('testdata/token_request_body.json');
const requestToken = await request.post('https://restful-booker.herokuapp.com/auth', {data:requestBodyToken});

const requestTokenBody = await requestToken.json();
const token = requestTokenBody.token;
console.log('Token ---------> ', token)

//--------------------------------------------- Partcally update booking details
const requestBodyPatch = readJson('testdata/patch_request_body.json');
const responseBodyPatch = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingID}}`,{
                                               data: requestBodyPatch,
                                               headers: {'Cookie': `token=${token}`}
});

const responsePatch = await responseBodyPatch.json();
console.log(responsePatch);

})