import $ from "./Components/Libs/jQuery.js";
import BoxedQuote from "./Components/BoxedQuote.js";
import ContentImage from "./Components/ContentImage.js";
import ImageGrid from "./Components/ImageGrid.js";
import SlidedownModal from "./Components/SlidedownBox.js";
import HeaderBox from "./Components/HeaderBox.js";
import TitleBox from "./Components/TitleBox.js";
import ArticleTabber from "./Components/ArticleTabber.js";
import ArticleWithTabs from "./Components/ArticleWithTabs.js";
import ReferenceList from "./Components/ReferenceList.js";
import FooterBox from "./Components/FooterBox.js";
import Metadata from "./Metadata.js";
import SelectionSheet from "./Components/SelectionSheet.js";

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
            SelectionSheet.register();
        }
    }

    static onhover() {
        $(this).attr("org_title", $(this).attr('title'));
        $(this).attr('title', '');
    }

    static outhover() {
        $(this).attr('title', $(this).attr("org_title"));
    }

    static main() {
        $(document).ready(Main.onready);
        $("[title]").hover(Main.onhover, Main.outhover);
    }

}

Main.main();