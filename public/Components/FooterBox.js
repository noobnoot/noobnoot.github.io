import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";
import Metadata from "../Metadata.js";

class FooterBox extends HTMLElement {

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/footerBox.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
        `;
    }

    static get name() {
        return "footer-box";
    }

    static register() {
        customElements.define(FooterBox.name, FooterBox);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild( ComponentHelper.createTemplate(FooterBox.templateRaw) );
    }

    connectedCallback() {
        let tag = Metadata.data.authors.length > 1 ? "us" : "me";
        let authors = ComponentHelper.arrayToSentence(Metadata.data.authors);
        let type = Metadata.data.type;
        let text = `[ERR] Unset footer text.`;
        switch (type) {
            case "undergrad" : {
                text = `This webpage is a part of our requirement in the subject <b>${Metadata.data.subject}</b> presented by <b>${authors}</b>. You can contact ${tag} using this email <u>${Metadata.data.email}</u> for queries, suggestions, corrections, and other concerns.`
                break;
            } case "edu" : {
                text = `This webpage is designed to provide students with access to their lesson in the subject ${Metadata.data.subject} through a local server. The goal is to make learning accessible and efficient, regardless of external internet availability. You can contact ${tag} using this email <u>${Metadata.data.email}</u> for queries, suggestions, corrections, and other concerns.`
                break;
            } case "home": {
                text = `This webpage is designed to provide students with access to their learning resources through a local server. The goal is to make learning accessible and efficient, regardless of external internet availability. You can contact ${tag} using this email <u>${Metadata.data.email}</u> for queries, suggestions, corrections, and other concerns.`
                break;
            }
        }
        
        $(this.shadowRoot)
            .append($("<p></p>").append(text));
    }

}

export default FooterBox;