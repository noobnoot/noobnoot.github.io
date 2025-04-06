import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";

class SelectionSheet extends HTMLElement {

    static letterChoices = Array.from(
        { length: 26 },
        function getLetter(item, index) {
            return String.fromCharCode(65 + index);
        }
    );

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/boxedQuote.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <div class="wrapper">
                
            </div>
        `;
    }

    static get name() {
        return "selection-sheet";
    }

    static get observedAttributes() {
        return ["choices", "count"];
    }

    static register() {
        customElements.define(SelectionSheet.name, SelectionSheet);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild( ComponentHelper.createTemplate(SelectionSheet.templateRaw) );
    }

    render() {
        $(this.shadowRoot).empty();
        const rowCount = parseInt($(this).attr("count"));
        const choiceCount = parseInt($(this).attr("choices"));
        for (let i = 0; i < rowCount; i++) {
            let row = $(`<div style="display: grid; grid-template-columns: 2fr repeat(${choiceCount}, 1fr); gap: calc(2px + 0.6vw);"><div>${i + 1})</div></div>`);
            for (let j = 0; j < choiceCount; j++) {
                let choice = $(`<div><input required type="radio" name="Q${i}" value="${SelectionSheet.letterChoices[j]}">${SelectionSheet.letterChoices[j]}) Item</div>`);
                $(row).append(choice);
            }
            $(this.shadowRoot)
                .children(".wrapper")
                .append(row);
        }
    }

    attributeChangedCallback() {
        if ($(this).attr("choices") !== undefined && $(this).attr("count") !== undefined) {
            this.render();
        }
    }

    connectedCallback() {
        console.log("Hi");
    }

}

export default SelectionSheet;