
import $ from 'jquery'


var lupa = {
    filterLv1Oppened: false,
    filterLv2Oppened: false,

    init: function(){
        console.log("Init");
    }, 

    addEventListeners: function(){

        $('.search-link').on("click", function(e){
            lupa.filterLv1Oppened = !lupa.filterLv1Oppened;
            if (lupa.filterLv1Oppened){
                $('.main-area .filtros-lv1').addClass('on');
                $('.search-link').addClass('on');
                $('.search-link').removeClass('off').addClass('on');
            }else{
                $('.main-area .filtros-lv1').removeClass('on');
                $('.main-area .filtros-lv2').removeClass('on');
                $('.search-link').removeClass('on').addClass('off');
            }
        });

        $('.marca').on("click", function(e){
            lupa.filterLv2Oppened = !lupa.filterLv2Oppened;
            if (lupa.filterLv2Oppened){
                $('.main-area .filtros-lv2').addClass('on');
            }else{
                $('.main-area .filtros-lv2').removeClass('on');
            }
        });
    }

}

$(document).ready(function() {
    setTimeout(function(){
        lupa.init();
        lupa.addEventListeners();
    }, 200);
});

