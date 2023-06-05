//
// SPAGHETTI NAVIGATIONS
// navigations.js 
// by Joren C. Langbid
//
// Note: This script requires jquery to function.
//
// This script handles all the functionality of 'tabs' and
// the click-to-open-elements accross the page.
//

$(document).ready(function() {

    // hide components

    var imagePreviewer = $("#image-preview-modal");
    var tabItems = $("section.tab-item");
    var contents = $(".structured-content .content-text");
    var modalContents = $(".modal-content")

    // hides previewer
    imagePreviewer.hide();

    // hides all tabitems and shows the first one
    tabItems.hide();
    tabItems.first().show();

    contents.hide();
    contents.first().show();

    modalContents.slideToggle(1000);

    // activate first tabs
    $(".nav-tab").first().toggleClass("active");
    $(".content-nav .content-nav-tab:first-child").toggleClass("active");
    
    // for Tab Items
    $(".nav-tab").click(function() {

        var navTabs = $(this).parent().children();
        var index = navTabs.index(this);

        navTabs.removeClass("active");
        $(this).addClass("active");

        tabItems.hide();
        tabItems.eq(index).css("display", "grid");

    });

    $(".content-nav-tab").click(function() {

        var contents = $(this).parent().siblings(".content-text");
        var contentNavs = $(this).parent().children();
        var index = contentNavs.index(this);

        contentNavs.removeClass("active");
        $(this).addClass("active");

        contents.hide();
        contents.eq(index).css("display", "block");

    }); 

    $(".image-grid img").click(function() {

        var src = $(this).attr("src");
        var ref = $(this).attr("ref");

        imagePreviewer.fadeIn();
        $("#image-preview-modal img").attr("src", src);
        $("#image-preview-modal p").text(ref);

    });

    $("#image-preview-modal img").click(function() {

        imagePreviewer.fadeOut();

    });

    $(".modal-body h4").click(function() {

        var modalContent = $(this).parent().children(".modal-content");
        modalContent.slideToggle(1000);
        
    });

});