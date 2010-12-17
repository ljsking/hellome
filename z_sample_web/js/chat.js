function addMessageChat()
{
  new Ajax.Request( '/cgi-bin/addChat.py', {
     method: 'post',
     parameters: $('chatMessage').serialize()+"&username="+username,
     onSuccess: function( transport ) {
       $('messageText').value = '';
     }
  } );
}

function getMessagesChat()
{
  new Ajax.Request( '/cgi-bin/messagesChat.py', {
    method: 'post',
    parameters: 'id='+lastIdChat,
    onSuccess: function( transport ) {
      var messages = transport.responseXML.getElementsByTagName( 'message' );

      for( var i = 0; i < messages.length; i++ ) {
        var message = messages[i].firstChild.nodeValue;
        var username = messages[i].getAttribute('username');
        var date = messages[i].getAttribute('date');
        var id = parseInt( messages[i].getAttribute('id') );

        if ( id > lastIdChat ) {
          // new Insertion.Bottom('chat', "<p><span>"+date+"</span> - <span>"+username+"</span></p><p>"+message+"</p>");
          new Insertion.Bottom($("lastMessages"), "<dt><span class='chatUser'>"+username+"</span><span class='chatDate'>"+date+"</span></dt><dd>"+message+"</dd>");
          lastIdChat = id;
        }
      }
      $("lastMessages").scrollTop=$("lastMessages").scrollHeight;
      window.setTimeout( getMessagesChat, 1000 );
    }
  } );
}