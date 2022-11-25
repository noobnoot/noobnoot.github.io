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
    var tabItems = $(".tab-item");
    var structuredTabs = $(".structured-content");
    var contents = $(".structured-content .content-text");
    var modalContents = $(".modal-content")

    imagePreviewer.hide();
    tabItems.hide();
    tabItems.first().show();
    contents.hide();
    modalContents.slideToggle(1000);

    // only shows the first content-text of a structured-content
    for (var i = 0; i < structuredTabs.length; i++)
        structuredTabs.eq(i).children(".content-text").first().css("display", "block");

    // activate first tabs
    var firstNavTab = $(".nav-tab").first();
    firstNavTab.toggleClass("active");
    var firstContentNavs = $(".content-nav .content-nav-tab:first-child");
    firstContentNavs.toggleClass("active");
    
    // For Tab Items
    $(".nav-tab").click(function() {

        var navTabs = $(this).parent().children();
        var index = navTabs.index(this);

        navTabs.removeClass("active");
        $(this).addClass("active");

        tabItems.hide();
        tabItems.eq(index).css("display", "grid");

    });

    $(".content-nav-tab").click(function() {

        var contents = $(this).parent().parent().children(".content-text");
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