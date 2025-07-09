import express from "express";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";

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

    configureMiddleware() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(this.__dirname, "public")));
    }

    setRoutes() {
        this.app.get("/", (req, res) => this.handleHome(req, res));
        this.app.post("/submit", (req, res) => this.handleFormSubmission(req, res));
    }

    handleHome(req, res) {
        res.sendFile(path.join(this.__dirname, "/public/index.html"));
    }

    handleFormSubmission(req, res) {
        const filePath = path.join(this.__dirname, "responses.json");

        fs.readFile(filePath, "utf8", (err, data) => {
            let responses = [];
            if (!err) {
                try {
                    responses = JSON.parse(data);
                } catch (parseErr) {
                    console.error("Failed to parse JSON:", parseErr);
                }
            }

            const newResponse = [ new Date().toISOString(), ...Object.values(req.body) ];
            responses.push(newResponse);

            fs.writeFile(filePath, JSON.stringify(responses, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error("Failed to write JSON:", writeErr);
                    res.status(500).send("Failed to save response.");
                } else {
                    res.send("Thank you for your submission!");
                }
            });
        });
    }

    start() {
        this.app.listen(this.port, this.host, () => {
            console.log(`Server running on http://${this.host}:${this.port}/`);
        });
    }
}

export default Server;