import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";

class ToolWeightedAverage extends HTMLElement {

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/toolWeightedAverage.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <form onsubmit="return false;">
                <div class="row-container">
                    <div>
                        <span>Subject Code (Optional)</span>
                        <span>Grade</span>
                        <span>Units</span>
                    </div>
                    <div>
                        <input type="text" name="sub-code">
                        <input type="number" step="0.25" value="1.75" min="1" max="5" name="grade" required>
                        <div>
                            <input type="number" step="1" value="3" min="1" max="16" name="units" required>
                        </div>
                    </div>
                </div>
                <div class="control-panel">
                    <button name="btn-add-row" type="button">Add Row</button>
                    <button name="btn-clear" type="button">Clear</button>
                    <button name="btn-calculate" type="submit">Calculate</button>
                </div>
            </form>
        `;
    }

    static get rowTemplate() {
        return `
            <div>
                <input type="text" name="sub-code">
                <input type="number" step="0.25" value="1.75" min="1" max="5" name="grade" required>
                <div>
                    <input type="number" step="1" value="3" min="1" max="16" name="units" required>
                    <button name="btn-remove-row" type="button">✖</button>
                </div>
            </div> 
        `;
    }

    static get name() {
        return "tool-weighted-average";
    }

    static get observedAttributes() {
        return [ "total-weight-result", "weighted-average-result" ];
    }

    static register() {
        customElements.define(ToolWeightedAverage.name, ToolWeightedAverage);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        $(this.shadowRoot).append(ComponentHelper.createTemplate(ToolWeightedAverage.templateRaw));
        this.initialize();
    }

    clear() {
        this.rowCount = 1;
        $(this.shadowRoot)
            .children("form")
            .children(".row-container")
            .children("div")
            .each(
                function(index) {
                    if (index > 1) { $(this).remove(); }
                }
            );
    }

    addRow() {
        this.rowCount++;
        $(this.shadowRoot)
            .children("form")
            .children(".row-container")
            .append(ComponentHelper.createTemplate( ToolWeightedAverage.rowTemplate ));
        let lastButton = $(this.shadowRoot)
            .children("form")
            .children(".row-container")
            .find("button")
            .last();
        let lastButtonRow = lastButton.parent("div").parent("div");
        lastButton.bind(
                "click",
                { row: lastButtonRow, this: this },
                function(event) {
                    $(event.target).off("click");
                    event.data.row.remove();
                    event.data.this.rowCount--;
                }
            )
    }

    calculate() {
        let gradesInputs = $(this.shadowRoot).find(`input[name="grade"]`);
        let unitsInputs = $(this.shadowRoot).find(`input[name="units"]`);
        
        let units = [];
        let grades = [];
        let weights = [];

        let totalUnits = 0;
        let sumOfWeights = 0;
        let gwaRaw;
        let gwaRounded;

        unitsInputs.each(
            function() {
                let val = parseInt($(this).val());
                units.push(val);
                totalUnits += val;
            }
        )

        gradesInputs.each(
            function() {
                let val = parseFloat($(this).val());
                grades.push(val);
            }
        )

        for (let i = 0; i < this.rowCount; i++) {
            let weight = units[i] * grades[i];
            weights.push(weight);
            sumOfWeights += weight;
        }

        console.log(sumOfWeights, this.rowCount);

        gwaRaw = sumOfWeights / totalUnits;
        gwaRounded = Math.round((gwaRaw + Number.EPSILON) * 100) / 100;

        this.totalWeightBox.val(totalUnits);
        this.weightedAverageResultBox.val(gwaRaw + " (rounded as " + gwaRounded + ")");
    }

    initialize() {
        this.rowCount = 1;
        $(this.shadowRoot)
            .find(`button[name="btn-add-row"]`)
            .bind(
                "click",
                { obj: this },
                function(event) { event.data.obj.addRow(); }
            );
        $(this.shadowRoot)
            .children("form")
            .bind(
                "submit",
                { obj: this },
                function(event) { event.data.obj.calculate(); }
            );
        $(this.shadowRoot)
            .find(`button[name="btn-clear"]`)
            .bind(
                "click",
                { obj: this },
                function(event) { event.data.obj.clear(); }
            );
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "total-weight-result")
        {
            this.totalWeightBox = $(document).find(`input[name="${newValue}"]`);
        }
        else if (name == "weighted-average-result")
        {
            this.weightedAverageResultBox = $(document).find(`input[name="${newValue}"]`);
        }
    }

    connectedCallback() { }
    disconnectedCallback() { }
}

export default ToolWeightedAverage;