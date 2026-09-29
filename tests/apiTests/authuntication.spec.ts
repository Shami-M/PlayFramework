/**
 * 1) No Auth
 * 2) Basic Auth/Preemtive Auth(userName and password)
 * 3) Bearer token
 * 4) API key authuntication
 */

import {test,expect} from '@playwright/test';

test('Public API No Auth', async({request})=>{

    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');    

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    console.log(responseBody);

}),

test('Basic Authentication', async({request})=>{

    const response = await request.get('https://httpbin.org/basic-auth/user/pass', {
                                        headers:
                                        {
                                            Authorization:"Basic " +Buffer.from('user:pass').toString('base64')
                                        }
    });    

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);

})

test('Bearer Token', async({request})=>{

    //---- If bearer token is expired goto the following website and open Network tab using devTools. Then do the login.
    // select contacts api. Goto Headers-> Scroll down to Request headers -> Under Authorization you can find the bearer token value.
    // You can find the api documentation in the same website to access other apis
    //website. - https://thinking-tester-contact-list.herokuapp.com/
    //email - mayac@yopmail.com
    //password - Test@@123

    const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTlmZDAwNGRiNTQ3MzAwMTVhZDJiMzUiLCJpYXQiOjE3NzIwODE5NjB9.IaSV3PK-66FWxZ_W29_viBVebeODKhdinay5KxtI33Y";
    const response = await request.get('https://thinking-tester-contact-list.herokuapp.com/users/me', {
                                        headers:
                                        {
                                            Authorization:`Bearer ${bearerToken}`
                                        }
    });    

    //expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);

})

test('API Key Authentication', async({request}) =>{

    //Select Store section and 1st api request(GET/store/inventory) for the request using the following website.
    //website - https://petstore.swagger.io/#/
    //email - mayac@yopmail.com
    //password - Test@@123
    const response = await request.get('https://petstore.swagger.io/v2/store/inventory',{
                                    params:{
                                            Key:'api_key',
                                            Value:'special-key'
                                        }
                                    });

    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);
    console.log(await response.json());

})
