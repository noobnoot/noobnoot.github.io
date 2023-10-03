import Metadata from "../Metadata.js";
import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";

class ToolAnswerSheet extends HTMLElement {

    static #rowCount = 0;
    #resultBox;

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/toolAnswerSheet.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <form onsubmit="return false;">
                <!--<div style="display: flex;">
                    <label for="id">Student ID:</label>&nbsp
                    <input id="id" type="text" name="id">
                    &nbsp<label for="strand">Strand:</label>&nbsp
                    <select name="strand" id="strand">
                        <option value="TVL-ICT">TVL-ICT</option>
                        <option value="TVL-HE">TVL-HE</option>
                        <option value="HUMMS">HUMMS</option>
                        <option value="ABM">ABM</option>
                        <option value="STEM">STEM</option>
                        <option value="GAS">GAS</option>
                    </select>
                </div>
                <div style="display: flex;">
                    <label for="last">Last Name:</label>&nbsp
                    <input id="last" type="text" name="last">
                    &nbsp<label for="first">Email Address:</label>&nbsp
                    <input id="first" type="text" name="first">
                </div>-->
                <div class="row-container">
                    <fieldset>
                        <span>Item</span>
                        <span>Strongly Disagree</span>
                        <span>Disagree</span>
                        <span>Agree</span>
                        <span>Strongly Agree</span>
                    </fieldset>
                </div>
                <div class="control-panel">
                    <button name="btn-clear" type="button">Clear</button>
                    <button name="btn-calculate" type="submit">Calculate</button>
                </div>
            </form>
        `;
    }

    static get name() {
        return "tool-answer-sheet";
    }

    static get observedAttributes() {
        return [ "result" ];
    }

    static register() {
        customElements.define(ToolAnswerSheet.name, ToolAnswerSheet);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        $(this.shadowRoot).append(ComponentHelper.createTemplate(ToolAnswerSheet.templateRaw));
        this.initialize();
    }

    static findThreeGreatestIndices(arr) {
        if (arr.length < 3) {
          throw new Error("The array must have at least three elements");
        }
      
        let firstMax = Number.NEGATIVE_INFINITY;
        let secondMax = Number.NEGATIVE_INFINITY;
        let thirdMax = Number.NEGATIVE_INFINITY;
        let firstIdx = -1;
        let secondIdx = -1;
        let thirdIdx = -1;
      
        for (let i = 0; i < arr.length; i++) {
          const num = arr[i];
          
          if (num > firstMax) {
            thirdMax = secondMax;
            secondMax = firstMax;
            firstMax = num;
            thirdIdx = secondIdx;
            secondIdx = firstIdx;
            firstIdx = i;
          } else if (num > secondMax && num !== firstMax) {
            thirdMax = secondMax;
            secondMax = num;
            thirdIdx = secondIdx;
            secondIdx = i;
          } else if (num > thirdMax && num !== secondMax && num !== firstMax) {
            thirdMax = num;
            thirdIdx = i;
          }
        }
      
        return [firstIdx, secondIdx, thirdIdx];
    }

    clear() {
        $(this.shadowRoot)
            .find(`input[type="radio"]`)
            .prop("checked", false);
    }

    addRow(item) {
        
        let row = `
            <fieldset>
                <span>${ToolAnswerSheet.#rowCount + 1}. ${item}</span>
                <input type="radio" name="${ToolAnswerSheet.#rowCount}" value="1" required>
                <input type="radio" name="${ToolAnswerSheet.#rowCount}" value="2" required>
                <input type="radio" name="${ToolAnswerSheet.#rowCount}" value="3" required>
                <input type="radio" name="${ToolAnswerSheet.#rowCount}" value="4" required>
            </fieldset> 
        `;
        $(this.shadowRoot)
            .children("form")
            .children(".row-container")
            .append(ComponentHelper.createTemplate( row ));
        ToolAnswerSheet.#rowCount++;
    }

    calculate() {
        
        const genres = [
            "Action: Shooting",
            "Action: Non-shooting",
            "Action: Fighting",
            "Strategy: Turn-based",
            "Strategy: Real-time",
            "RPG",
            "Sport",
            "Simulation: Vehicle",
            "Simulation: Construction",
            "Simulation: Artificial Intelligence",
            "Adventure",
            "Puzzle",
            "Online"
        ];

        let totals = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        let totalsMax = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        let totalsOverMax = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        let weights = [ 0, 1/3, 2/3, 1 ]; // set 1 approach
        let items = Metadata.data.items;
        let fieldsets = $(this.shadowRoot)
            .children("form")
            .find("fieldset");

        for (let i = 0; i < totalsMax.length; i++) {
            for (let j = 0; j < items.length; j++) {
                totalsMax[i] += items[j].scores[i];
            }
        }

        fieldsets.each(
            function(index) {
                if (index == 0) { return; }
                let item = items[index - 1];
                let radios = $(this).children(`input[type="radio"]`);
                for (let i = 0; i < radios.length; i++) {
                    if ($(radios[i]).is(":checked")) {
                        let weight = weights[i];
                        for (let j = 0; j < totals.length; j++) {
                            totals[j] += (item.scores[j] * weight);
                        }
                    }
                }
            }
        );

        console.log(totals);
        console.log(totalsMax);

        for (let i = 0; i < totals.length; i++) {
            totalsOverMax[i] = totalsMax[i] == 0 ? 0 : 100 * totals[i]/totalsMax[i];
            console.log(`${genres[i]}: ${totalsOverMax[i]}`);
        }

        let greatestIndices = ToolAnswerSheet.findThreeGreatestIndices(totalsOverMax);
        let dominantGenres = ["None", "None", "None"]
        let dominantPercents = [0, 0, 0]

        for (let i = 0; i < greatestIndices.length; i++) {
            dominantGenres[i] = genres[ greatestIndices[i] ];
            dominantPercents[i] = ComponentHelper.roundToTwo( totalsOverMax[ greatestIndices[i] ] );
        }

        this.#resultBox.html(`
            <style>
                .red {
                    background-color: #F55;
                }
                
                .orange {
                    background-color: orange;
                }
                
                .yellow {
                    background-color: yellow;
                }
            </style>
            Your dominant game genre are <b><span class="red">${ dominantGenres[0] }</span> (${dominantPercents[0]}%), <span class="orange">${ dominantGenres[1] }</span> (${dominantPercents[1]}%), and <span class="yellow">${ dominantGenres[2] }</span> (${dominantPercents[2]}%)</b>.
        `);

        console.log(dominantGenres);

    }

    initialize() {
        this.rowCount = 1;
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
        if (name == "result") {
            this.#resultBox = $(`#${newValue}`);
        }
    }

    connectedCallback() { }

    disconnectedCallback() {
        let items = Metadata.data.items;
        for (let i = 0; i < items.length; i++) {
            this.addRow(items[i].item);
        }
    }
}

export default ToolAnswerSheet;