import {expect, test} from "@playwright/test";
//import * as path from 'path';

test('All playright locators and elements', async({page, context})=>{

    page.goto("https://gauravkhurana.in/test-automation-play/");

    //Click on Basic tab
    const basicTab = page.getByRole('tab', {name:'Basic'});
    await basicTab.click();
    await expect(basicTab).toHaveAttribute('aria-selected', 'true');
    
    //Input fname
    await page.getByTestId('first-name-input').fill('John');

    //Radio btn
    const gender = page.getByTestId('radio-female')
    await gender.check();
    await expect(gender).toBeChecked();
    //Verify other options are not selected
    const otherGernders = ['radio-male', 'radio-other', 'radio-no-answer'];
    for(const genderNames of otherGernders){
        const names = page.getByTestId(genderNames);
        await expect(names).not.toBeChecked();
        await expect(names).toHaveAttribute('aria-checked', 'false')
    }

    //Internal Links
    //Click on Jump to Advanced Features
    // await page.getByRole('link', {name: 'Jump to Advanced Features'}).click();
    // await expect(page).toHaveURL('https://gauravkhurana.in/test-automation-play/#advanced-features')
    
    //External links open in a new tab
    //Playwright documentation
    const [newPage] = await Promise.all([
        // It is important to await the event first
        context.waitForEvent('page'),
        page.getByRole('link', {name: 'Playwright Documentation ↗'}).click()
    ]);

    await newPage.waitForLoadState();
    //Assertion in newly opened tab
    await expect(newPage).toHaveURL('https://playwright.dev/');
    //Assertion for old tab
    await expect(page.getByRole('link', {name: 'Selenium Documentation ↗'})).toBeVisible();
})

test('Dropdowns', async({page})=>{

    await page.goto('https://testing.qaautomationlabs.com/dropdown.php');

    await expect(page.getByText('Dropdown Demo', {exact: true})).toBeVisible();

    //Single select dropdown
    //Using label
    await page.locator('#fruitDropdown').selectOption({label:'Oranges'});
    await expect(page.locator('p#result')).toContainText('You selected: Orange');
    //Using Value
    await page.locator('#fruitDropdown').and(page.locator("[onchange= 'showSelectedFruit()']")).selectOption({value:'Banana'});
    await expect(page.locator('p#result')).toContainText('You selected: Banana');
    //Using Index
    await page.locator('#fruitDropdown').selectOption({index: 3});
    await expect(page.locator('p#result')).toContainText('You selected: Mango');

})

test('Screenshots', async({page})=>{

    await page.goto('https://semantic-ui.com/modules/dropdown.html');

    await expect(page.locator('h1')).toContainText('Dropdown');

    //Take a full screenshot
    await page.screenshot({path: 'FullPageScreenshot.png'});
    await page.screenshot({path: 'FullPageScreenshot2.png', fullPage:true});
    //Take a partial screenshot
    await page.locator('h1').screenshot({path:'PartialScreenshot.png'})

})

//Not working
// test('Multioptional dropdown selection', async({page})=>{
//     await page.goto('https://semantic-ui.com/modules/dropdown.html');
//     await expect(page.locator('h1')).toContainText('Dropdown');

//   //  await page.locator('select[name="skills"]').click();
//     await page.locator('select[name="skills"]').first().click();
//     //.selectOption(['css', 'node']);
// })

test('Click button right', async({page})=>{

    await page.goto('https://testing.qaautomationlabs.com/notifications.php');

    //Click on button right
    await page.locator('button.toastsDefaultSuccess').click({button:'left'});
})

test('Hover and Keyboard Actions', async({page})=>{

    await page.goto('https://gauravkhurana.com/test-automation-play/');

    //Click on Intermediate tab
    const basicTab = page.getByRole('tab', {name:'Intermediate'});
    await basicTab.click();
    await expect(basicTab).toHaveAttribute('aria-selected', 'true');

    // //Hover
    // const hoverItem1 = await page.getByText('Hover Item 1');
    // await hoverItem1.hover();
    // //Get the hoverd value
    // const hoverItem1Value = await page.getByText('(Hovered!)');
    // await expect(hoverItem1Value).toBeVisible();

    //KeyBoard Actions --- Volume Control bar
    const slider = await page.locator('span[data-slot="slider-track"]').nth(1);
    await slider.click();
    await page.keyboard.press('ArrowRight');

    //OR
    //await slider.press('ArrowRight');
   
})

test('Drag and drop', async({page})=>{

    await page.goto('https://gauravkhurana.com/test-automation-play/');

    //Click on Intermediate tab
    const basicTab = page.getByRole('tab', {name:'Intermediate'});
    await basicTab.click();
    await expect(basicTab).toHaveAttribute('aria-selected', 'true');

    const sourceItem = await page.getByTestId('drag-item-item-2').filter({hasText:'Item 2'});
    const targetItem = await page.getByTestId('drop-zone');

    //------------------ Method 1 : Using locator.dragTo()
    await sourceItem.dragTo(targetItem);
    await expect(page.locator('[data-testid="dropped-item-item-2"] span')).toHaveText('Item 2');

    // //------------------- Method 2: Using manual mouse actions
    // // Hover over the source element and press the mouse button
    // await sourceItem.hover();
    // await page.mouse.down();

    // //Hover over the target element to trigger 'dragover' events. Then release the mouse button to complete the drop
    // await targetItem.hover();
    // await page.mouse.up();
    // await expect(page.locator('[data-testid="dropped-item-item-2"] span')).toHaveText('Item 2');
})

test('Alerts and Popups', async({page})=>{

    await page.goto('https://gauravkhurana.com/test-automation-play/');

    //Click on Advanced tab
    const advancedTab = page.getByRole('tab', {name:'Advanced'});
    await advancedTab.click();
    await expect(advancedTab).toHaveAttribute('aria-selected', 'true');

    // //Click on OK
    // page.on('dialog', async dialog => {
    //      dialog.accept('Do you want to continue?');
    // });
    // //Click on Show Confirm and it's options
    // await page.getByText('Show Confirm').click();

    //OR
    
    //Click on Cancel
    page.on('dialog', async dialog =>{
         dialog.dismiss();
    })
    //Click on Show Confirm and it's options again
    await page.getByText('Show Confirm').click();
})

test('Wait until loading is complete', async({page})=>{

    await page.goto('https://gauravkhurana.com/test-automation-play/');

    //Click on Complex tab
    const basicTab = page.getByRole('tab', {name:'Complex'});
    await basicTab.click();
    await expect(basicTab).toHaveAttribute('aria-selected', 'true');

    await page.getByText('Try Operation').click();
    await expect(page.getByText('Retrying...')).toBeVisible();
    await page.waitForSelector('div[role="progressbar"]', {state:'hidden'});
    await expect(page.getByText('Try Operation')).toBeVisible();
   
})

