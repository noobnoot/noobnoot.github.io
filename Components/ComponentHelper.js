class ComponentHelper {

    static createTemplate(innerHTML) {
        let e = $("<template></template>")[0];
        e.innerHTML = innerHTML;
        return e.content.cloneNode(true);
    }

}

export default ComponentHelper;