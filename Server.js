import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';

class Server {
    
    constructor(host, port) {
        this.app = express();
        this.host = host;
        this.port = port;
        this.__filename = fileURLToPath(import.meta.url);
        this.__dirname = path.dirname(this.__filename);

        this.configureMiddleware();
        this.setRoutes();
    }

    // Middleware configuration
    configureMiddleware() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(this.__dirname, 'public')));
    }

    // Define routes
    setRoutes() {
        // Serve the HTML form
        this.app.get('/', (req, res) => this.handleHome(req, res));

        // Handle form submissions
        this.app.post('/submit', (req, res) => this.handleFormSubmission(req, res));
    }

    // Route Handlers
    handleHome(req, res) {
        res.sendFile(path.join(this.__dirname, '/public/Home/index.html'));
    }

    handleFormSubmission(req, res) {
        const { name, answer } = req.body;
        const filePath = path.join(this.__dirname, 'responses.json');

        fs.readFile(filePath, 'utf8', (err, data) => {
            let responses = [];
            if (!err) {
                try {
                    responses = JSON.parse(data);
                } catch (parseErr) {
                    console.error('Failed to parse JSON:', parseErr);
                }
            }

            const newResponse = { name, answer, timestamp: new Date().toISOString() };
            responses.push(newResponse);

            fs.writeFile(filePath, JSON.stringify(responses, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Failed to write JSON:', writeErr);
                    res.status(500).send('Failed to save response.');
                } else {
                    res.send('Thank you for your submission!');
                }
            });
        });
    }

    // Start the server
    start() {
        this.app.listen(this.port, this.host, () => {
            console.log(`Server running on http://${this.host}:${this.port}/`);
        });
    }
}

// Initialize and start the server
const server = new Server('192.168.100.24', 8080);
server.start();