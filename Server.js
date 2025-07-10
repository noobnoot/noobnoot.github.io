import express from "express";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs/promises";
import { fileURLToPath } from "url";

class Server {
    constructor(host, port) {
        this.app = express();
        this.host = host;
        this.port = port;
        this.__filename = fileURLToPath(import.meta.url);
        this.__dirname = path.dirname(this.__filename);
        this.locks = new Set();
        this.configureMiddleware();
        this.setRoutes();
    }

    configureMiddleware() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(this.__dirname, "public")));
        this.app.use(
            function(req, res, next) {
                res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
                next();
            }
        );
    }

    setRoutes() {
        const self = this; // `const` for scope consistency
        this.app.get("/", function(req, res) { self.handleHome(req, res); });
        this.app.post("/submit", function(req, res) { self.handleFormSubmission(req, res); });
    }

    handleHome(req, res) {
        res.sendFile(path.join(this.__dirname, "/public/index.html"));
    }

    async lock(filePath) {
        const self = this;
        const lockFile = filePath + ".lock";
        while (self.locks.has(lockFile)) {
            await new Promise(function(resolve) { setTimeout(resolve, 50); });
        }
        self.locks.add(lockFile);
        try {
            await fs.writeFile(lockFile, "LOCK");
        } catch (err) {
            self.locks.delete(lockFile);
            throw err;
        }
    }

    async unlock(filePath) {
        const self = this;
        const lockFile = filePath + ".lock";
        try {
            await fs.unlink(lockFile);
        } catch (err) {
            console.warn("Could not remove lock file:", err);
        }
        self.locks.delete(lockFile);
    }

    async handleFormSubmission(req, res) {
        const self = this;
        const body = Object.assign({}, req.body);
        const formName = body.form_name.replace(/[^a-z0-9_-]/gi, "_");
        const filePath = path.join(this.__dirname, "public/_FormData", formName + ".csv");
        const classNumber = body.class_number;

        if (classNumber === undefined || classNumber === null || classNumber === "") {
            return res.status(400).redirect("/VSYS0.9/submit.html?stat=1");
        }

        delete body.form_name;
        const timestamp = new Date().toISOString();
        const values = Object.values(body);
        const row = [timestamp].concat(values).join(",") + "\n";

        try {
            await self.lock(filePath);

            let fileExists = true; // `let` because it might be reassigned
            let existingData = "";
            try {
                existingData = await fs.readFile(filePath, "utf8");
            } catch (err) {
                if (err.code === "ENOENT") {
                    fileExists = false;
                } else {
                    throw err;
                }
            }

            if (fileExists === false) {
                const headers = ["Timestamp"].concat(Object.keys(body)).join(",") + "\n";
                await fs.writeFile(filePath, headers);
            } else {
                const lines = existingData.trim().split("\n");
                const headers = lines[0].split(",");
                const classNumberIndex = headers.indexOf("class_number");

                if (classNumberIndex !== -1) {
                    for (let i = 1; i < lines.length; i++) {
                        const columns = lines[i].split(",");
                        if (columns[classNumberIndex] === classNumber) {
                            await self.unlock(filePath);
                            return res.status(400).redirect("/VSYS0.9/submit.html?stat=2");
                        }
                    }
                }
            }

            await fs.appendFile(filePath, row);
            await self.unlock(filePath);
            return res.redirect("/VSYS0.9/submit.html?stat=0");

        } catch (err) {
            console.error("Submission error:", err);
            try {
                await self.unlock(filePath);
            } catch (unlockErr) {
                console.warn("Failed to unlock:", unlockErr);
            }
            return res.status(500).redirect("/VSYS0.9/submit.html?stat=1");
        }
    }

    start() {
        const self = this;
        this.app.listen(this.port, this.host, function() {
            console.log("Server running on http://" + self.host + ":" + self.port + "/");
        });
    }
}

export default Server;