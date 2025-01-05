import Server from "./Server.js";

class Entry {
    static main() {
        const server = new Server("localhost", 8080);
        server.start();
    }
}

Entry.main();