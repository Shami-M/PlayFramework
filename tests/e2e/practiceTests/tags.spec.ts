import {test, expect} from '@playwright/test';

test('File Upload @smoke', async({page}) =>{
    await page.goto('https://testing.qaautomationlabs.com/file-upload.php');
    await expect(page.getByTestId('upload-browse-btn')).toBeVisible();
    await page.getByTestId('upload-browse-btn').setInputFiles('./testdata/orchid-on-window.jpg')
    await expect(page.getByTestId('upload-file-info')).toContainText('Selected File:');
})

test('File Download', {tag: ['@health']}, async({page}) =>{
    await page.goto('https://testing.qaautomationlabs.com/file-download.php');
    await expect(page.getByText('Generate and Download Text File Demo')).toBeVisible();
    //Create a file to download later
    await page.getByTestId('download-text-input').fill('Test download'); 
    await page.getByTestId('download-generate-btn').click();
    await expect(page.getByRole('link', {name:" Download File"})).toBeVisible();

    //Download the file
    // const [downloadItem] = await Promise.all([
    //     page.waitForEvent("download"),
    //     page.getByRole('link', {name:" Download File"}).click()
    // ]);
    //Get the path of the downloaded file
    // const filePath =  await downloadItem.path();
    // console.log(filePath);

    //OR

    //Download the file
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', {name:" Download File"}).click();
    const download = await downloadPromise;
    await download.saveAs('download/myFile.txt');
 })

 