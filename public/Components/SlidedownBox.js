import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";

class SlidedownBox extends HTMLElement {

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/slidedownBox.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <div class="modal-body">
                <button tabindex="0" type="button"></button>
                <div class="modal-content">
                </div>
            </div>
        `;
    }

    static get name() {
        return "slidedown-box";
    }

    static get observedAttributes() {
        return ["title"];
    }

    static register() {
        customElements.define(SlidedownBox.name, SlidedownBox);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        $(this.shadowRoot).append(ComponentHelper.createTemplate(SlidedownBox.templateRaw));
        this.initialize();
    }

    initialize() {
        $(this.shadowRoot)
            .children('.modal-body')
            .children('.modal-content')
            .slideToggle();
    }

    attributeChangedCallback(name) {
        // moves the innerHTML of the <slidedown-modal> to `shadowRoot`;
        if ( name == "title" ) {
            $(this.shadowRoot)
                .children(".modal-body")
                .children("button")
                .text(this.getAttribute("title"));
        }
    }

    connectedCallback() {
        // adds `click` event on <button>, which slides the next element
        // (which is the .modal-content);
        $(this.shadowRoot)
            .children(".modal-body")
            .children("button")
            .click(function() {
                $(this).next().slideToggle(1000);
            });
        // moves children of <slidedown-modal> to the shadow realm lol;
        // I used `.appendTo` to prevent cloning of moved elements;
        $(this)
            .children()
            .appendTo(
                $(this.shadowRoot)
                    .children(".modal-body")
                    .children(".modal-content")
            );
    }

    disconnectedCallback() {
        // disables the event listener for click on <button>;
        $(this.shadowRoot)
            .children(".modal-body")
            .children("button")
            .off("click");
    }
}

export default SlidedownBox;