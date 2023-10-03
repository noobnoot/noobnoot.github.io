import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";

class ContentImage extends HTMLElement {

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/contentImage.css"/>
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <img>
            <p class="caption"></p>
        `;
    }

    static get name() {
        return "content-image";
    }

    static get observedAttributes() {
        return ["src", "author", "href", "title", "limit-height", "limit-height-med", "align-top", "align-bottom"];
    }

    static register() {
        customElements.define(ContentImage.name, ContentImage);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild( ComponentHelper.createTemplate(ContentImage.templateRaw) );
    }

    setCaption(title, author, href) {
        $(this.shadowRoot)
            .children(".caption")
            .empty();
        if (!title && !author) {
            $(this.shadowRoot)
                .children(".caption")
                .remove();
            return;
        }
        let link = $("<a>")
            .attr({ href: href })
            .text(author);
        $(this.shadowRoot)
            .children(".caption")
            .append(title ? title + " | " : "")
            .append("Photo by: ")
            .append(link);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let img = $(this.shadowRoot).children("img");
        switch( name ) {
            case "src": {
                img.attr("src", newValue);
                break;
            } case "author": {
                img.attr("alt", `Photo by ${newValue}`);
            // eslint-disable-next-line no-fallthrough
            } case "align-top":
              case "align-bottom":
              case "limit-height":
              case "limit-height-med": {
                img.addClass(name);
                break;
            }
        }
        this.setCaption(
            this.getAttribute("title"),
            this.getAttribute("author"),
            this.getAttribute("href")
        );
    }

}

export default ContentImage;