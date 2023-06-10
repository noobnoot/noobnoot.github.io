class Navigations {

    static onNavTabClick() {
        var tabItems = $("section.tab-item");
        var navTabs = $(this).parent().children();
        var index = navTabs.index(this);

        navTabs.removeClass("active");
        $(this).addClass("active");

        tabItems.hide();
        tabItems.eq(index).css("display", "grid");
    }

    static onContentNavTabClick() {
        var contents = $(this).parent().siblings(".content-text");
        var contentNavs = $(this).parent().children();
        var index = contentNavs.index(this);

        contentNavs.removeClass("active");
        $(this).addClass("active");

        contents.hide();
        contents.eq(index).css("display", "block");
    }

    static initialize() {
        var tabItems = $("section.tab-item");
        var structuredContents = $(".structured-content");
        var contents = structuredContents.children(".content-text");
    
        // hides all tabitems
        tabItems.hide();
        contents.hide();
    
        // shows first tabs/content
        tabItems.first().show();
        $(".nav-tab").first().toggleClass("active");
        $(".content-nav .content-nav-tab:first-child").toggleClass("active");
        for ( let i = 0; i < structuredContents.length; i++ ) {
            structuredContents.eq(i).children(".content-text").first().show();
        }
    
        $(".nav-tab").click(Navigations.onNavTabClick);
        $(".content-nav-tab").click(Navigations.onContentNavTabClick); 
    }

}

export default Navigations;
