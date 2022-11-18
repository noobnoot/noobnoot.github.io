//
// NAVIGATIONS
// navigations.js 
// by Joren C. Langbid
//
// This script handles all the functionality of 'tabs' and
// the click-to-open-elements accross the page.
//

function hideTabContent(element) {
    element.style.display = "none";
}

function activateTabButton(element) {
    element.className += " active";
}

function deactivateTabButton(element) {
    element.className = element.className.replace(" active", "");
}

window.onload = function onload() {
    
    var firstTabContent = document.getElementsByClassName("tab-content")[0];
    var firstNavTab = document.getElementsByClassName("nav-tab")[0];
    var contentTexts = document.querySelectorAll("#content .content-text");
    var firstContentNavTab = document.getElementsByClassName("content-nav-tab")[0];
    activateTabButton(firstContentNavTab);

    for (let i = 1; i < contentTexts.length; i++) {
        hideTabContent(contentTexts[i]);
    }

    activateTabButton(firstNavTab);
    firstTabContent.style.display = "grid";

}

function chooseContentTab(event, tabContentName) {

    var contentTexts = document.querySelectorAll("#content .content-text");
    var tabButtons = document.getElementsByClassName("content-nav-tab");

    for (let i = 0; i < contentTexts.length; i++) {
        hideTabContent(contentTexts[i]);
    }

    for (let i = 0; i < tabButtons.length; i++) {
        deactivateTabButton(tabButtons[i]);
    }

    document.getElementById(tabContentName).style.display = "block";
    activateTabButton(event.currentTarget);

}

function chooseTab(event, tabContentName) {

    var tabContent = document.getElementsByClassName("tab-content");
    var navTabs = document.getElementsByClassName("nav-tab");

    for (let i = 0; i < tabContent.length; i++) {
        hideTabContent(tabContent[i]);
    }
    
    for (let i = 0; i < navTabs.length; i++) {
        deactivateTabButton(navTabs[i]);
    }

    document.getElementById(tabContentName).style.display = "grid";
    activateTabButton(event.currentTarget);
    
}

function toggleQuestion(event, questionId) {

    var content = document.getElementById(questionId);
    console.log( content.style.display );
    if ( content.style.display != "block" ) {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }

}