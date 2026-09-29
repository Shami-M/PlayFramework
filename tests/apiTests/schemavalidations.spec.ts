/**
 * Prerequisites:
 * Install the required packages:
 * npm install --save-dev playwright ajv
 * * AJV is used for JSON schema validation.
 */

import {test,expect} from '@playwright/test';
import AJV from 'ajv';
import fs from 'fs';

function readJson(filePath:string){
    return JSON.parse(fs.readFileSync(filePath,'utf-8'));
}

test('Schecma validation', async({request})=>{
//Website: https://restful-booker.herokuapp.com/apidoc/index.html

const response = await request.get('https:mocktarget.apigee.net/json');
const responseBody = await response.json();
console.log(responseBody);

    const schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Generated schema for Root",
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string"
            },
            "lastName": {
                "type": "string"
            },
            "city": {
                "type": "string"
            },
            "state": {
                "type": "string"
            }
        },
        "required": [
            "firstName",
            "lastName",
            "city",
            "state"
        ]
    };

    const ajv = new AJV();
    const validate = ajv.compile(schema); // ajv.compile(schema) returns a validator function
    const isValid = validate(responseBody); // validate(data) checks if the response matched the schema
    expect(isValid).toBeTruthy();

})

test('Schecma validation via json file', async({request})=>{

const response = await request.get('https:mocktarget.apigee.net/json');
const responseBody = await response.json();
console.log(responseBody);

const schema = readJson('testdata/schemaData.json');

    const ajv = new AJV();
    const validate = ajv.compile(schema); // ajv.compile(schema) returns a validator function
    const isValid = validate(responseBody); // validate(data) checks if the response matched the schema
    expect(isValid).toBeTruthy();

})