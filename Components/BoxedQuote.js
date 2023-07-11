import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";

class BoxedQuote extends HTMLElement {

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/boxedQuote.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <div class="text">
                <div class="wrapper"></div>
            </div>
        `;
    }

    static get name() {
        return "boxed-quote";
    }

    static get observedAttributes() {
        return ["src", "alt"];
    }

    static register() {
        customElements.define(BoxedQuote.name, BoxedQuote);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild( ComponentHelper.createTemplate(BoxedQuote.templateRaw) );
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ( name === "src" ) {
            // if <boxed-quote> has `src`, create div.img element
            // and attach `src` as its background; handles the
            // grid layout stuff for it as well;
            if ( newValue ) {
                $(this.shadowRoot)
                    .children(".text")
                    .before($(`<div class="img"></div>`));
                $(this.shadowRoot)
                    .children(".img")
                    .css("background-image", `url(${newValue})`);
                $(this)
                    .css("grid-template-columns", "1fr 6fr 18fr")
            // else, (if src is empty) revert changes;
            } else {
                $(this.shadowRoot)
                    .children(".img")
                    .remove();
                $(this)
                    .css("grid-template-columns", "1fr 24fr")
            }
        } else if ( name === "alt" ) {
            if ( newValue ) {
                $(this.shadowRoot)
                    .children(".img")
                    .attr("alt", newValue);
            }
        }
    }

    connectedCallback() {
        // moves children of <boxed-quote> to the shadow realm lol;
        // I used `.appendTo` to prevent cloning of moved elements;
        $(this)
            .children()
            .appendTo(
                $(this.shadowRoot)
                    .children(".text")
                    .children(".wrapper")
            );
    }

}

export default BoxedQuote;