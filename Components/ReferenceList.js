import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";
import Metadata from "../Metadata.js";

class ReferenceList extends HTMLElement {

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/referenceList.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <section>
                <h1>References:</h1>
            </section>
        `;
    }

    static get name() {
        return "reference-list";
    }

    static register() {
        customElements.define(ReferenceList.name, ReferenceList);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild( ComponentHelper.createTemplate(ReferenceList.templateRaw) );
    }

    connectedCallback() {
        let references = Metadata.data.references;
        for (let i = 0; i < references.length; i++) {
            let p = $("<p></p>")
                .append(references[i].content)
                .append(references[i].link ? ` Retrieved from <span class="word-break-wrap">${references[i].link}</span>` : "");
            $(this.shadowRoot)
                .children("section")
                .append(p);
        }
    }

}

export default ReferenceList;