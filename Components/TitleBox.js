import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";
import Metadata from "../Metadata.js";

class TitleBox extends HTMLElement {

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/titleBox.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <h3>
                <span class="l0rge"></span>
                <br>
            </h3>
            <p class="subtitle"></p>
        `;
    }

    static get name() {
        return "title-box";
    }

    static register() {
        customElements.define(TitleBox.name, TitleBox);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild( ComponentHelper.createTemplate(TitleBox.templateRaw) );
    }

    connectedCallback() {
        // sets up title; refer to `metadata.json::{ title, subtitle }`
        let h3 = $(this.shadowRoot).children("h3");
        let spanL0rge = h3.children("span.l0rge");
        spanL0rge.append(Metadata.data.title);
        h3.append(Metadata.data.subtitle);
        // sets up subtitle; refer to `metadata.json::{ authors[], section }`
        let pSubtitle = $(this.shadowRoot).children("p.subtitle");
        let authorsText = "";
        for (let i = 0; i < Metadata.data.authors.length; i++) {   
            if (i != 0) {
                authorsText += ", ";
                if (i == Metadata.data.authors.length - 1) {
                    authorsText += " and ";
                }
            } 
            authorsText += Metadata.data.authors[i];
        }
        pSubtitle.append(`by ${authorsText}${Metadata.data.section.length > 0 ? "," : ""} ${Metadata.data.section}`);
    }

}

export default TitleBox;