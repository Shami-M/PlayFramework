import {chromium, test} from '@playwright/test';

//Handle multiple browser contexts in playwright
test.describe.parallel('Group One', ()=>{
  //  test.describe.configure({mode:'serial'})
test('Multiple browser contexts', async()=>{
    const browser = await chromium.launch();

    //Create browser instances
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    //Create a page inside the browser instance
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    const page21 = await context2.newPage();

    //Each context has independent cookies/storage
    await page1.goto('https://rahulshettyacademy.com/practice');
    await page2.goto('https://rahulshettyacademy.com');
    await page21.goto('https://rahulshettyacademy.com/practice');

    await context1.close();
    //Opening another tab in the same browser window context2
    await context2.close();

    await browser.close();
})

//Handle iframes in playwright

test('Handling iframes', async({page})=>{
    await page.goto('https://testing.qaautomationlabs.com/iframe.php');

    // frameLocator - automatically waits for the iframe and avoids flaky tests.
    //await page.frameLocator('[name="iframe2"]').locator('button').click();

    //OR
    //frame - returns a Frame or null and does not auto-wait. While null checks prevent crashes,
    await page.waitForSelector('iframe[name="iframe1"]');
    const frame = page.frame({name: 'iframe1'});
    if(frame){
        await frame.locator('button').click();
    }
    
})

})