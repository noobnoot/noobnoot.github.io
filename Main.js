import Server from "./Server.js";

class Entry {
    static main() {
        const server = new Server("127.0.0.1", 8080);
        server.start();
    }
}

Entry.main();