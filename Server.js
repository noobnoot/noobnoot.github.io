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

        const body = { ...req.body};
        const formName = body.form_name.replace(/[^a-z0-9_-]/gi, '_');
        const filePath = path.join(this.__dirname, "public/_FormData", `${formName}.csv`);

        delete body.form_name;

        const columnNames = Object.keys(body);
        const values = Object.values(body);
        const timestamp = new Date().toISOString();
        const row = [timestamp, ...values].join(",") + "\n";

        if (!fs.existsSync(filePath)) {
            const headers = ["Timestamp", ...columnNames].join(",") + "\n";
            fs.writeFileSync(filePath, headers)
        }

        const classNumber = body.class_number;
        
        if (classNumber) {
            const existingData = fs.readFileSync(filePath, "utf8");
            const lines = existingData.trim().split("\n").slice(1); // skip header

            const duplicate = lines.some(line => {
                const columns = line.split(",");
                return columns[1] === classNumber; // assuming class_number is always second column
            });

            if (duplicate) {
                return res.status(400).redirect("/VSYS1.0/submit.html?stat=2"); // stat=2 = duplicate
            }
        }

        fs.appendFile(filePath, row,
            function(error) {
                if (error) {
                    res.status(500).redirect("/VSYS1.0/submit.html?stat=1");
                }
                res.redirect("/VSYS1.0/submit.html?stat=0");
            }
        );
    }

    start() {
        this.app.listen(this.port, this.host, () => {
            console.log(`Server running on http://${this.host}:${this.port}/`);
        });
    }
}

export default Server;