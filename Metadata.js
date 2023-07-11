import ComponentHelper from "../Components/Libs/ComponentHelper.js";
import $ from "../Components/Libs/jQuery.js";

class Metadata {

    static #data;
    static #callback;

    static set onready(callback) {
        Metadata.#callback = callback;
    }

    static set data(a) {
        if ( Metadata.#data === undefined ) {
            Metadata.#data = a;
            Object.freeze(Metadata.#data);
        } else {
            console.log("[ERR] Metadata: attempt to set `data` twice.");
        }
    }

    static get data() {
        return Metadata.#data;
    }

    static initialize() {
        let src = $("meta[name=\"metadata\"]").attr("src");
        ComponentHelper.jsonLoad(src,
            function(data) {
                Metadata.data = data;
                Metadata.#callback();
            }.bind(this)
        );
    }

}

export default Metadata;