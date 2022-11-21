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

    // Initialize components

    $(".tab-content").hide();
    $(".tab-content").first().show();

    $(".structured-content .content-text").hide();

    // only shows the first content-text of a structured-content
    var structuredContents = $(".structured-content");
    for (var i = 0; i < structuredContents.length; i++)
        structuredContents.eq(i).children(".content-text").first().css("display", "block");

    $(".nav-tab").first().toggleClass("active");
    $(".content-nav .content-nav-tab:first-child").toggleClass("active");
    $(".question > .question-content").slideToggle();

    // Event listeners

    $(".question h4").click(function() {
        $(".question > .question-content").slideToggle(1000);
    });

    $(".nav-tab").click(function() {

        var navTabs = $(this).parent().children();
        var index = navTabs.index(this);

        navTabs.removeClass("active");
        $(this).addClass("active");

        $(".tab-content").hide();
        $(".tab-content").eq(index).css("display", "grid");

    });

    $(".content-nav-tab").click(function() {

        var structuredContents = $(this).parent().parent().children(".content-text");
        var sections = $(this).parent().children();
        var index = sections.index(this);

        sections.removeClass("active");
        $(this).addClass("active");

        structuredContents.hide();
        structuredContents.eq(index).css("display", "block");

    });

});