function resizeContainer(){
    $('entry_container').css('height', document.documentElement.clientHeight+"px");
    var colonnes = $('.entry');
    var taille=0;
    for (var i=0; i<colonnes.length;i++){
        taille+=parseInt($(colonnes[i]).css('width'))+3;
    }
     // taille += parseInt($("chat").style.width)+3
    $('entry_container').css('width', taille+"px");
}


var actualColumn;

function browseColumns(target, scroll2comment) {
    
    if (!actualColumn) {
        actualColumn = $(target);
        actualColumn.attr("class",".entry opened").css('width', "300px");
        resizeContainer();
        
    }
    else {
        actualColumn.attr("class",".entry").css('width', "200px");
        if (actualColumn!=target) actualColumn.scrollTop = 0;

        actualColumn = $(target);
        actualColumn.attr("class",".entry opened").css('width', "300px");
        
        resizeContainer();      
    }
  
    overflow(actualColumn)
}

function overflow(target){
    var a = target.offsetLeft;
    var b = target.offsetLeft+$(target).css('width');
    
    var tailleAffichage = window.innerWidth;
    var scroll = window.scrollX;
    
    var cumulative = a-scroll;
    
    if ((a-scroll)<0) window.scrollBy(a-scroll-20,0); // pas propre
    else if (b>tailleAffichage) window.scrollTo(b-tailleAffichage,0);
}

var lastIdChat = 0;
var username;

$(document).ready(function() {
    window.scrollTo(0,0);

    var colonnes = $(".entry")
    for (var i=0; i<colonnes.length;i++){ 
        $(colonnes[i]).css('width', "200px");
        colonnes[i].scrollTop=0;
        colonnes.click(function(event) {
            if ($(event.target).is("a")) return;
            browseColumns(event.currentTarget)
        });
    };        
    
    resizeContainer();
    getMessages();
    lastComments();
    

});