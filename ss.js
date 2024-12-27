const puppeteer = require('puppeteer');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const url = "https://www.crafin.in/buy-gift-cards/"; // Replace with your desired URL
async function takeScreenshot() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    for (let i = 1; i <= 3; i++) {
        console.log('taking screenshot');
        await page.screenshot({ path: `screenshot_${i}.png`, fullPage: true });
        if (i + 1 <= 3) {
            const functionExists = await page.evaluate(() => typeof window.cn_pagination === 'function');
            if (functionExists) {
                await page.evaluate((i) => {
                    window.cn_pagination(i + 1); // Call the function defined in the page
                }, i);
            } else {
                console.error('cn_pagination function is not defined on the page');
                break;
            }
        }
        await sleep(4000); // Wait for 4 seconds
    }

    await browser.close();
}

module.exports = takeScreenshot;

