import ComponentHelper from "./ComponentHelper.js";

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
        return ["src", "author", "href", "title", "limit-height", "align-top", "align-bottom"];
    }

    static register() {
        customElements.define(ContentImage.name, ContentImage);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild( ComponentHelper.createTemplate(ContentImage.templateRaw) );
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let img = $(this.shadowRoot).children("img");
        switch( name ) {
            case "src": {
                img.attr("src", newValue);
                break;
            } case "author": {
                img.attr("alt", `Photo by ${newValue}`)
            } case "align-top": case "align-bottom": case "limit-height": {
                img.addClass(name);
                break;
            }
        }
    }

    connectedCallback() {
        let link = $("<a>")
            .attr({ href: this.getAttribute("href") })
            .text(this.getAttribute("author"));
        $(this.shadowRoot)
            .children(".caption")
            .append( this.getAttribute("title") ? this.getAttribute("title") + " | " : "" )
            .append("Photo by: ")
            .append(link);
        // removes caption if title and author not set
        if ( !this.getAttribute("title") && !this.getAttribute("author") ) {
            $(this.shadowRoot).children(".caption").remove();
        }
    }

}

export default ContentImage;