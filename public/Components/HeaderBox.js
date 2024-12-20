import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";
import Metadata from "../Metadata.js";

class HeaderBox extends HTMLElement {

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/headerBox.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <div></div>
            <p></p>    
            <p></p>
        `;
    }

    static get name() {
        return "header-box";
    }

    static get observedAttributes() {
        return ["meta"];
    }

    static register() {
        customElements.define(HeaderBox.name, HeaderBox);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild( ComponentHelper.createTemplate(HeaderBox.templateRaw) );
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ( name == "meta" ) {
            ComponentHelper.jsonLoad(newValue,
                function(data) {
                    let div = $(this).children("div");
                    let pName = $(this).children("p:first-of-type");
                    let pDate = $(this).children("p:last-of-type");
                    // setup texts
                    for ( let i = 0; i < data.text.length; i++) {
                        pName.append(data.text[i]);
                        if ( i != data.text.length ) {
                            pName.append("<br>");
                        }
                    }
                    // setup images
                    for ( let i = 0; i < data.logos.length; i++) {
                        let img = $("<img>")
                            .attr({
                                src: data.logos[i].src,
                                alt: data.logos[i].alt
                            });
                        div.append(img);
                    }
                    pDate.append(`${Metadata.data.dueMonth} ${Metadata.data.dueYear}`);
                }.bind(this.shadowRoot)
            );
        }
    }

    connectedCallback() {

    }

}

export default HeaderBox;