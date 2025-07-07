import $ from "../public/Components/Libs/jQuery.js";
import BoxedQuote from "../public/Components/BoxedQuote.js";
import ContentImage from "../public/Components/ContentImage.js";
import ImageGrid from "../public/Components/ImageGrid.js";
import SlidedownModal from "../public/Components/SlidedownBox.js";
import HeaderBox from "../public/Components/HeaderBox.js";
import TitleBox from "../public/Components/TitleBox.js";
import ArticleTabber from "../public/Components/ArticleTabber.js";
import ArticleWithTabs from "../public/Components/ArticleWithTabs.js";
import ReferenceList from "../public/Components/ReferenceList.js";
import FooterBox from "../public/Components/FooterBox.js";
import Metadata from "../public/Metadata.js";
import SelectionSheet from "../public/Components/SelectionSheet.js";

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