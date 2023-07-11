import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";

class ArticleTabber extends HTMLElement {

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/articleTabber.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <nav></nav>
        `;
    }

    static get name() {
        return "article-tabber";
    }

    static register() {
        customElements.define(ArticleTabber.name, ArticleTabber);
    }


    static createNavButton(nav, index, article) {
        let title = $(article)
            .attr("title")
            .toUpperCase();
        // creates a <button>; also binds onclick event to it,
        // moving :active to it and hiding the article's sibling
        // elements;
        let button = $("<button type=\"button\"></button>")
            .click(function(event) {
                $(event.currentTarget)
                    .addClass("active")
                    .siblings("button")
                    .removeClass("active");
                $(article)
                    .css({ display: $(article).is("article-with-tabs") ? "grid" : "block" })
                    .siblings("article, article-with-tabs")
                    .hide();
            })
            .append(title);
        nav
            .append(button);
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        $(this.shadowRoot).append(ComponentHelper.createTemplate(ArticleTabber.templateRaw));
    }

    connectedCallback() {
        // moves children of <slidedown-modal> to the shadow realm lol;
        // I used `.appendTo` to prevent cloning of moved elements;
        $(this)
            .children()
            .appendTo($(this.shadowRoot));
        // hides all the <articles> and showing only the first one;
        // adds `click` event to each corresponding article button;
        let nav = $(this.shadowRoot)
            .children("nav");
        $(this.shadowRoot)
            .children("article, article-with-tabs")
            .hide()
            .each(ArticleTabber.createNavButton.bind(null, nav))
            .first()
            .show();
        // initially activates the first button;
        nav
            .children()
            .first()
            .addClass("active");
    }

}

export default ArticleTabber;