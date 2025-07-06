import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";

class ContentImage extends HTMLElement {

    #img = $("<img>");

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/contentImage.css"/>
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <p class="caption"></p>
        `;
    }

    static get name() {
        return "content-image";
    }

    static get observedAttributes() {
        return ["src", "author", "href", "caption", "limit-height", "limit-height-med", "align-top", "align-bottom"];
    }

    static register() {
        customElements.define(ContentImage.name, ContentImage);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild( ComponentHelper.createTemplate(ContentImage.templateRaw) );
    }

    setCaption(caption, author, href) {
        $(this.shadowRoot)
            .children(".caption")
            .empty();
        if (!caption && !author) {
            $(this.shadowRoot)
                .children(".caption")
                .remove();
            return;
        }
        let link = $("<a>")
            .attr({ href: href })
            .text(author);
        if (!author) {
            $(this.shadowRoot)
                .children(".caption")
                .append(caption);
        } else {
            $(this.shadowRoot)
                .children(".caption")
                .append(caption ? caption + " | " : "")
                .append("Photo by: ")
                .append(link);
        }
    }
        
    attributeChangedCallback(name, oldValue, newValue) {
        switch( name ) {
            case "author": {
                this.#img.attr("alt", `Photo by ${newValue}`);
            // eslint-disable-next-line no-fallthrough
            } case "align-top":
              case "align-bottom":
              case "limit-height":
              case "limit-height-med": {
                this.#img.addClass(name);
                break;
            } case "src": {
                this.#img.prependTo(this.shadowRoot);
                this.#img.attr("src", newValue);
                break;
            }
        }
        this.setCaption(
            this.getAttribute("caption"),
            this.getAttribute("author"),
            this.getAttribute("href")
        );
    }

    connectedCallback() {
        // moves children of <content-image> to the shadow realm lol;
        // I used `.appendTo` to prevent cloning of moved elements;
        $(this)
            .children()
            .prependTo(
                $(this.shadowRoot)
            );
    }

}

export default ContentImage;