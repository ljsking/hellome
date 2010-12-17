function resizeContainer(){
    $('content').css('height', document.documentElement.clientHeight+"px");
    var colonnes = $('.post');
    var taille=0;
    for (var i=0; i<colonnes.length;i++){
        taille+=parseInt($(colonnes[i]).css('width'))+3;
    }
     // taille += parseInt($("chat").style.width)+3
    $('content').css('width', taille+"em");
}

var actualColumn;

function browseColumns(target, scroll2comment) {
    
    if (!actualColumn) {
        actualColumn = $(target);
        actualColumn.attr("class","post opened").css('width', "34em");
        resizeContainer();
        
    }
    else {
        actualColumn.attr("class","post").css('width', "13em");
        if (actualColumn!=target) actualColumn.scrollTop = 0;

        actualColumn = $(target);
        actualColumn.attr("class","post opened").css('width', "34em");
        
        resizeContainer();      
    }
    if (scroll2comment){
        $(actualColumn).scrollTop($(scroll2comment).position().top);        
        $('.comments', $(scroll2comment)).css('display', "block");
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

    var colonnes = $(".post")
    for (var i=0; i<colonnes.length;i++){ 
        $(colonnes[i]).css('width', "13em");
        colonnes[i].scrollTop=0;
        colonnes.click(function(event) {
            if ($(event.target).is("a")) return;
            browseColumns(event.currentTarget)
        });
    };        
    
    resizeContainer();
    getMessages();
    lastComments();
    
    if (navigator.userAgent.match(/os x/i) && $.browser.Gecko) $('#theme').css('position', "absolute");
    
    
    //username = window.prompt("Please choose a login", "");
    // getMessagesChat();
    //Event.observe('chatMessage', 'keydown', function(event) {
        //if (event.keyCode == Event.KEY_RETURN && !event.shiftKey)
            //addMessageChat();
    //});
});

$(document).resize(function() {
    resizeContainer();
});