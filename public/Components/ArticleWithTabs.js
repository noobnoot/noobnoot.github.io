import ComponentHelper from "./Libs/ComponentHelper.js";
import $ from "./Libs/jQuery.js";

class ArticleWithTabs extends HTMLElement {

    static get templateRaw() {
        return `
            <link rel="stylesheet" href="../Components/Styles/articleWithTabs.css">
            <link rel="stylesheet" href="../basePotatoStyle.css">
            <nav></nav>
        `;
    }

    static get name() {
        return "article-with-tabs";
    }

    static register() {
        customElements.define(ArticleWithTabs.name, ArticleWithTabs);
    }


    static createNavButton(nav, index, section) {
        let title = $(section)
            .attr("title");
        // creates a <button>; also binds onclick event to it,
        // moving :active to it and hiding the section's sibling
        // elements;
        let subtitle = $(section)
            .attr("subtitle");
        let subtitleText = subtitle ? `<br><p>${subtitle}<p>` : "";
        
        let button = $("<button type=\"button\"></button>")
            .click(function(event) {
                $(event.currentTarget)
                    .addClass("active")
                    .siblings("button")
                    .removeClass("active");
                $(section)
                    .show()
                    .siblings("section")
                    .hide();
            })
            .append(title)
            .append(subtitleText);
        nav
            .append(button);
        button
            .prop("alt", $(section).attr("alt-title"))
            .prop("gen", button.html());
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        $(this.shadowRoot).append(ComponentHelper.createTemplate(ArticleWithTabs.templateRaw));
    }

    connectedCallback() {
        // moves children of <article-with-tabs> to the shadow realm lol;
        // I used `.appendTo` to prevent cloning of moved elements;
        $(this)
            .children()
            .appendTo($(this.shadowRoot));
        // hides all the <articles> and showing only the first one;
        // adds `click` event to each corresponding article button;
        let nav = $(this.shadowRoot)
            .children("nav");
        $(this.shadowRoot)
            .children("section")
            .hide()
            .each(ArticleWithTabs.createNavButton.bind(null, nav))
            .first()
            .show();
        // initially activates the first button;
        nav
            .children()
            .first()
            .addClass("active");
        
        window.addEventListener("resize", function() {
            nav
                .children("button")
                .each(
                    function() {
                        if ( window.innerWidth <= 800 ) {
                            $(this).text( $(this).prop("alt") );
                        } else {
                            $(this).html( $(this).prop("gen") );
                        }
                    }
                );
        });

        nav
            .children("button")
            .each(
                function() {
                    if ( window.innerWidth <= 800 ) {
                        $(this).text( $(this).prop("alt") );
                    } else {
                        $(this).html( $(this).prop("gen") );
                    }
                }
            );
    }

}

export default ArticleWithTabs;