import Server from "./Server.js";

class Entry {
    static main() {
        const server = new Server("0.0.0.0", 8000);
        server.start();
    }
}

Entry.main();