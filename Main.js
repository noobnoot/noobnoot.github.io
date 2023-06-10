import Navigations from "./Navigations.js";
import BoxedQuote from "../Components/BoxedQuote.js";
import ContentImage from "../Components/ContentImage.js";
import ImageGrid from "../Components/ImageGrid.js";
import SlidedownModal from "../Components/SlidedownModal.js";

class Main {
    
    static onready() {
        BoxedQuote.register();
        ContentImage.register();
        ImageGrid.register();
        SlidedownModal.register();
        Navigations.initialize();
    }

    static main() {
        $(document).ready(Main.onready);
    }

}

Main.main();