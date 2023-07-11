import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";

class ImageGrid extends HTMLElement {

    static isPreviewerInit = false;
    static isPreviewerShow = false;

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/imageGrid.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <div class="container">
            </div>
        `;
    }

    static get previewerTemplateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/imagePreviewerModal.css"> 
            <div id="image-previewer-modal">
                <img>
                <p class="caption"></p>
            </div>
        `
    }

    static get previewerId() { 
        return "#image-previewer-modal";
    }

    static get observedAttributes() {
        return ["col", "viewable"];
    }

    static get name() {
        return "image-grid";
    }

    // helper function that attaches the `src` to the
    // image of the previewer and `src` to the caption;
    static previewerDisplay(src, caption) {
        let previewer = $(ImageGrid.previewerId);
        ImageGrid.previewerShow();
            previewer
                .fadeIn()
                .children("img")
                .attr("src", src)
                .attr("alt", caption);
            previewer
                .children("p")
                .text(caption);
    }

    static previewerShow() {
        $(ImageGrid.previewerId).fadeIn();
        ImageGrid.isPreviewerShow = true;
    }

    static previewerHide() {
        $(ImageGrid.previewerId).fadeOut();
        ImageGrid.isPreviewerShow = false;
    }

    static register() {
        customElements.define(ImageGrid.name, ImageGrid);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        $(this.shadowRoot).append( ComponentHelper.createTemplate(ImageGrid.templateRaw) );
        this.initialize();
    }

    initialize() {
        this.viewable = false;
        // checks if the previewer is already set;
        if ( !ImageGrid.isPreviewerInit ) {
            // creates the previewer element and prepends it to the body;
            $("body").prepend( ComponentHelper.createTemplate(ImageGrid.previewerTemplateRaw) );
            let previewer = $(ImageGrid.previewerId);
            // initially hides the previewer, and adds a click listener 
            // to the <img> element it is currently previewing; if 
            // clicked or pressed enter while focused, the previewer
            // will disappear;
            previewer
                .hide()
                .children("img")
                .attr("alt", "empty")
                .click(function() {
                    ImageGrid.previewerHide();
                });
            ImageGrid.isPreviewerInit = true;
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ( name == "col" ) {
            // binds attribute `col` to the .container element,
            // defining how many columns the grid would need;
            $(this.shadowRoot)
                .children(".container")
                .css("grid-template-columns", `repeat(${newValue}, 1fr)`);
        } else if ( name == "viewable" ) {
            this.viewable = true;
        }
    }

    connectedCallback() {
        // moves children of <image-gird> to the shadow realm lol;
        // I used `.appendTo` to prevent cloning of moved elements;
        $(this)
            .children()
            .appendTo(
                $(this.shadowRoot)
                .children(".container")
            );
        // adds a click listener to the <img> elements inside the
        // `div.container`; if clicked, pass the `src` and `rel`
        // to the previewer; also, if pressed `enter` while
        // focused, also trigger `click` event.
        $(this.shadowRoot)
            .children(".container")
            .children("img")
            .attr("tabindex", "0")
            .click(function() {
                if ( !ImageGrid.isPreviewerShow ) {
                    ImageGrid.previewerDisplay(
                        $(this).attr("src"),
                        $(this).attr("ref")
                    );
                }
            });
    }

    disconnectedCallback() {
        // disables the event listener for click on the set of <img>;
        $(this.shadowRoot)
            .children(".image-grid")
            .children("img")
            .off("click");
    }
}

export default ImageGrid;