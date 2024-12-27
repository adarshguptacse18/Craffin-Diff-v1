const express = require('express');
const fs = require('fs');
const path = require('path');
const takeScreenshot = require('./ss');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    res.send('Hello World!');
});

app.get('/screenshots', async (req, res) => {
    await takeScreenshot();
    const screenshots = ['screenshot_1.png', 'screenshot_2.png', 'screenshot_3.png'];
    const files = screenshots.map(filename => ({
        filename,
        content: fs.readFileSync(path.join(__dirname, filename), 'base64')
    }));

    res.json(files);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});