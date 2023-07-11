import $ from "../Components/Libs/jQuery.js";
import BoxedQuote from "../Components/BoxedQuote.js";
import ContentImage from "../Components/ContentImage.js";
import ImageGrid from "../Components/ImageGrid.js";
import SlidedownModal from "../Components/SlidedownBox.js";
import HeaderBox from "../Components/HeaderBox.js";
import TitleBox from "../Components/TitleBox.js";
import ArticleTabber from "../Components/ArticleTabber.js";
import ArticleWithTabs from "../Components/ArticleWithTabs.js";
import ReferenceList from "../Components/ReferenceList.js";
import FooterBox from "../Components/FooterBox.js";
import Metadata from "../Metadata.js";

class Main {

    static onready() {
        Metadata.initialize();
        Metadata.onready = function() {
            BoxedQuote.register();
            ContentImage.register();
            ImageGrid.register();
            SlidedownModal.register();
            HeaderBox.register();
            TitleBox.register();
            ArticleTabber.register();
            ArticleWithTabs.register();
            ReferenceList.register();
            FooterBox.register();
        }
    }

    static main() {
        $(document).ready(Main.onready);
    }

}

Main.main();