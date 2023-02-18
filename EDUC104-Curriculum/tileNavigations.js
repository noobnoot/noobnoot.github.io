$(document).ready(function() {

    const TRANSITION_DURATION = 500;
    
    ////////////////////////////
    ///// INITIALIZE STUFF /////
    ////////////////////////////

    var contents = $(".content");
    var tiles = $(".tile");

    contents.hide();
    contents.eq(4).show();

    for (var i = 0; i < tiles.length; i++)
        tiles.eq(i).children(".tile-text").hide();

    ////////////////////////////
    ///// TILE TRANSITIONS /////
    ////////////////////////////

    function Tile_OnMouseover(tile) {
        tile.children(".tile-number").stop().fadeOut(TRANSITION_DURATION);
        tile.children(".tile-text").stop().fadeIn(TRANSITION_DURATION);
    }

    function Tile_OnMouseleave(tile) {
        tile.children(".tile-number").stop().fadeIn(TRANSITION_DURATION);
        tile.children(".tile-text").stop().fadeOut(TRANSITION_DURATION);
    }

    tiles.hover(
        function() { Tile_OnMouseover($(this)); },
        function() { Tile_OnMouseleave($(this)); }
    );

    ///////////////////////
    ///// NAVIGATIONS /////
    ///////////////////////

    tiles.click(
        function() {
            var index = tiles.index(this);

            contents.hide();
            contents.eq(index).show();

            tiles.removeClass("active");
            $(this).addClass("active");
        }
    );

    ////////////////////////
    ///// RANDOM WORDS /////
    ////////////////////////

    var randomTextSpan = $("#random-word");
    var randomTexts = [ "based", "planned", "guided", "dynamic", "anywhere", "democratic", "experience", "objective", "customizable" ];
    var counter = 0;
    setInterval(
        function() {
            if ( counter >= randomTexts.length ) { counter = 0; }
            randomTextSpan.text( randomTexts[ counter ] );
            counter++;
        }, 1500
    );

});