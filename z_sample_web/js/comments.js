function showHideComments(target){
    commentDivs = $('.comments', $(target).closest('.postContent'));
    // Of one or more commentDiv is visible, then status is considered as open.
    $.each(commentDivs, function(){
        if ($(this).css('display') == 'block'){
            status = 'open';
            return false;
        } else {
            status = 'closed';
        }
    })
    if (status == 'open'){
        $.each(commentDivs, function(){ $(this).css('display', 'none'); });
        status = 'closed';
    } else {
        $.each(commentDivs, function(){ $(this).css('display', 'block'); });
        status = 'open';
    }
}

function showHideSingleComments(target){
    commentDivs = $('.comments', $(target).closest('.commentsBlock'));
    if (commentDivs.css('display') == "block") commentDivs.css('display', 'none');
    else commentDivs.css('display', 'block');
}

function removeCommentForm(target){
    p = $(target).parent();
    p.replaceWith('<p class="commentsAdd">&rarr; <a href="javascript:void 0" onclick="commentForm(this)">add a comment</a> (plain text only)</p>');
    $('#newComment').remove()
}

function commentForm(target) {
    if ($('#newComment')) {
        $('.commentsAdd', $('#newComment').parent()).replaceWith('&rarr; <a href="javascript:void 0" onclick="commentForm(this)">add a comment</a> (plain text only)');
        $('#newComment').remove();
    }
    p = $(target).parent(); // p = paragraph where 'add comment' or 'cancel comment' is
    anchor = $('.commentsBlock', $(target).parents()).attr('id')
    p.after("<form id='newComment'><p><label for='username'>name</label><input type='text' name='username' value='' id='username' /></p><p><label for='url'>http://</label><input type='text' name='url' value='' id='website' /><span class='optional''> (optional)</span></p><textarea name='message' id='messagetext'></textarea><input type='button' name='sendComment' value='Publish' id='sendComment' onclick='this.disabled=true'/></form>")
    $('#sendComment').click(function(event) {
        addMessage(anchor);
        p.replaceWith('&rarr; <a href="javascript:void 0" onclick="commentForm(this)">add a comment</a> (plain text only)');
        $('newComment').remove();
    });
    p.replaceWith('<p class="commentsAdd">&rarr; <a href="javascript:void 0" onclick="removeCommentForm(this)">cancel comment</a></p>');
}

function addMessage(anchor) {
    var url = $('#newComment')['url'];
    if (!url.getValue()) url.value="none";
    else url.value="http://"+url.value;
    
    $.ajax({
        url: '/cgi-bin/addComment.py',
        method: 'post',
        parameters: $('#newComment').serialize()+"&anchor="+anchor,
        success: function(data) {
            getMessages();
        }
    });
}

var lastid = 0;

function getMessages() {
    $.ajax({
        url: '/cgi-bin/getComments.py',
        method: 'post',
        dataType: 'xml',
        parameters: 'id='+lastid,
        success: function(data){
            $(data).find("message").each(function() {
                var message = $(this).text();
                var url = $(this).attr('url');
                var anchor = $(this).attr('anchor');
                var username = $(this).attr('username');
                var date = $(this).attr('date');
                var id = parseInt( $(this).attr('id') );
                
                if ( id > lastid ) {
                    if (!$('dl', $(anchor))[0]) $('.commentsAdd:first-child', $('#'+anchor)).before("<dl></dl>");
                    if (url!='none') username = '<a target="_blank" href="'+url+'">'+username+'</a>'; 
                    $($('dl:first-child', $('#'+anchor))).append("<dt>"+username+" <span> "+date+" (gmt +1)</span></dt><dd>"+message+"</dd>");
                    $('.commentsNumber a:first-child', $('#'+anchor)).html($('dt', $('#'+anchor)).length+" comment(s)");
                    lastid = id;
                }
            });
        }
    });
}

function lastComments() {
    $.ajax({
        url: '/cgi-bin/lastComments.py',
        method: 'post',
        dataType: 'xml',
        success: function(data){
            $(data).find("message").each(function() {
                var message = $(this).text();
                var url = $(this).attr('url');
                var container = $(this).attr('container');
                var anchor = $(this).attr('anchor');
                var username = $(this).attr('username');
                var date = $(this).attr('date');
                var id = parseInt( $(this).attr('id') );

                if (url!='none') username = '<a target="_blank" href="'+url+'">'+username+'</a>'; 
                $("#lastComments").append('<dt><a href="javascript:void 0" onclick="browseColumns(\'#'+container+'\', \'#'+anchor+'\')">on &laquo;'+$('h2', $('#'+container))[0].innerHTML+'&raquo;</a><br \/>'+username+' <span> '+date+' (gmt +1) </span></dt><dd>'+message+'</dd>');
            });
        }
    });
}