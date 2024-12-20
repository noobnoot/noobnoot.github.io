const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/index.html'));
});

// Handle form submissions
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const answer = req.body.answer;

    const filePath = 'responses.json';
    fs.readFile(filePath, (err, data) => {
        let responses = [];
        if (!err) {
            try {
                responses = JSON.parse(data);
            } catch (parseErr) {}
        }

        const newResponse = { name, answer, timestamp: new Date().toISOString() };
        responses.push(newResponse);

        fs.writeFile(filePath, JSON.stringify(responses, null, 2), (writeErr) => {
            if (writeErr) {
                res.status(500).send('Failed to save response.');
            } else {
                res.send('Thank you for your submission!');
            }
        });
    });
});

app.listen(8080, '192.168.100.24', () => {
    console.log('Server running on http://192.168.100.24:8080/');
});