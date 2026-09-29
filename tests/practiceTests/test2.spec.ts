import {test,expect} from '@playwright/test'

test('Capture netweork requests and responses', async({page}) =>{

    // page.on('request', request =>{
    //     console.log('Reuqest URL : ', request.url());
    //     console.log('Method :', request.method());
    // })

    page.on('response', response =>{
        console.log('Reuqest URL : ', response.url());
        console.log('Status :', response.status());
    })

    await page.goto('https://gauravkhurana.com/test-automation-play/');

})