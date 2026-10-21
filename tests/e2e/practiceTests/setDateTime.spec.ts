import {test,expect} from '@playwright/test'

test('Get local date and time', async({page}) =>{
//Get local data and time 
const localDateTime = new Date(); 
console.log('Display normal time - ' +  localDateTime.toString());
console.log('Display 24hr time - ' + localDateTime.toLocaleString());

})

test('Get date and time via playwright config', async({page}) =>{
await page.goto('https://practice.qabrains.com/ecommerce/login');
const dateTime = await page.evaluate(() => {
    return new Date().toString();
  });
  console.log(dateTime);
})

test('Change location, timezone and Permission', async({browser}) =>{
//const browser = await chromium.launch();
const context = await browser.newContext({
    // geolocation: {latitude:28.61, longitude: 77.20},
    // permissions: ['geolocation'],
    //timezoneId: 'Asia/Kolkata,
    timezoneId: 'Europe/London',
    // locale: 'en-IN'
})

const page = await context.newPage();
await page.goto('https://practice.qabrains.com/ecommerce/login');
const dateTime = await page.evaluate(() => {
    return new Date().toString();
  });
console.log(dateTime);

})